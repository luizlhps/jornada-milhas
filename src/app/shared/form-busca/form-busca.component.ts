import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss'],
})
export class FormBaseComponent implements OnInit {
  cadastroForm!: FormGroup;
  estadoControl = new FormControl(null, Validators.required);

  @Input() perfilComponent: boolean = false;
  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao: string = 'CADASTRAR';
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() sair: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      cidade: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      estado: this.estadoControl,
      confirmarEmail: [null, [Validators.required, Validators.email]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [false, [Validators.requiredTrue]],
    });

    if (this.perfilComponent) {
      this.cadastroForm.get('aceitarTermos')?.setValidators(null);
    } else {
      this.cadastroForm
        .get('aceitarTermos')
        ?.setValidators([Validators.requiredTrue]);
    }

    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

    // this.formularioService.setCadastro(this.cadastroForm)
    this.onBirthDayChange();
  }

  //^\d+$
  onBirthDayChange() {
    this.cadastroForm.get('nascimento')?.valueChanges.subscribe((value) => {
      // this.cadastroForm
      //   .get('nascimento')
      //   ?.setValue(this.maskDate(value), { emitEvent: false });
      // console.log(this.maskDate(value));
    });
  }

  maskDate(ev: any) {
    let value = ev.target.value;
    if (!value) return '';
    let v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    console.log(v);
    return;
  }

  // var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  // return (m) ? new Date(m[3], m[2]-1, m[1]) : null;

  executarAcao() {
    this.acaoClique.emit();
  }

  deslogar() {
    this.sair.emit();
  }
}
