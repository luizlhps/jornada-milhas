import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-expand',
  templateUrl: './text-expand.component.html',
  styleUrls: ['./text-expand.component.scss'],
})
export class TextExpandComponent {
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLTextAreaElement>;

  adjustTextarea(): void {
    const textarea = this.chatInput.nativeElement;
    textarea.style.height = 'auto'; // Reseta a altura para calcular a altura correta
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`; // Define a nova altura de acordo com o conteúdo
  }
}
