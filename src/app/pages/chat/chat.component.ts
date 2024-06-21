import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements AfterViewInit {
  title = 'chatGPTClient';
  bot = './assets/bot.svg';
  user = './assets/user.svg';
  input = new FormControl();
  scrollOn = false;
  writing = false;

  arr: any = [
    {
      id: 1,
      type: 'user',
      text: 'Hello, how can I help you?',
    },
    {
      id: 2,
      type: 'bot',
      text: 'Hello, how can I help you?',
    },
  ];

  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef) {}
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    if (this.scrollOn) {
      this.scrollToBottom();
      this.scrollOn = false; // Reseta a flag após rolar
    }
  }

  scrollToBottom(): void {
    try {
      console.log(this.container);
      if (this.container) {
        this.container.nativeElement.scrollTo(
          0,
          this.container?.nativeElement.scrollHeight
        );
      }
    } catch (err) {
      console.error('Erro ao rolar para o final:', err);
    }
  }

  typeText(text: string) {
    let index = 0;
    console.log('Typing text:', text);

    let interval = setInterval(() => {
      if (index < text.length) {
        const lastMessage = this.arr[this.arr.length - 1];
        lastMessage.text += text.charAt(index);
        index++;

        this.cdr.detectChanges();
        this.scrollToBottom();
      } else {
        clearInterval(interval);
        this.scrollOn = true; // Garante a rolagem final após a escrita
      }
    }, 2); // Ajustado para 50ms para uma melhor visualização
  }

  generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hex = randomNumber.toString(16);
    return `id-${timestamp}-${hex}`;
  }

  async handlesubmit(e: Event) {
    e.preventDefault();
    const message = this.input.value;
    if (!message) return; // Não enviar mensagem se estiver vazia

    const userMessage = {
      id: this.generateUniqueId(),
      type: 'user',
      text: message,
    };

    this.arr.push(userMessage);

    this.input.reset(); // Limpa o campo de entrada
    this.scrollOn = true; // Rolagem após adicionar a mensagem do usuário

    try {
      const response: any = await this.httpClient
        .post('http://localhost:5000', { message })
        .toPromise();
      console.log('Response from server:', response);

      const botMessage = {
        id: this.generateUniqueId(),
        type: 'bot',
        text: '', // Inicialmente vazio para simular digitação
      };

      this.arr.push(botMessage);
      this.typeText(response.bot);
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  }
}
