  import { Component, OnInit } from '@angular/core';
  import { FormControl, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
  import { Fornecedor } from 'src/app/models/fornecedor';
  import { ClienteService } from 'src/app/services/cliente.service';
  import { FornecedorService } from 'src/app/services/fornecedor.service';

  @Component({
    selector: 'app-fornecedor-create',
    templateUrl: './fornecedor-create.component.html',
    styleUrls: ['./fornecedor-create.component.css']
  })
  export class FornecedorCreateComponent implements OnInit {

    fornecedor: Fornecedor = {
      id: '',
      nome: '',
      email: '',
      telefone: '',
      documento: '',
      tipoFornecedor: '',
      endereco: {
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      },
      statusFornecedor: 'ATIVO',
      formadeEntrega: ''
    }

    nome: FormControl = new FormControl(null, Validators.minLength(3))
    documento: FormControl = new FormControl(null, Validators.required)
    email: FormControl = new FormControl(null, Validators.email)
    telefone: FormControl = new FormControl(null, Validators.minLength(3))
    cep: FormControl = new FormControl(null, Validators.minLength(3))
    rua: FormControl = new FormControl(null, Validators.minLength(3))
    numero: FormControl = new FormControl(null, Validators.minLength(3))
    bairro: FormControl = new FormControl(null, Validators.minLength(3))
    complemento: FormControl = new FormControl(null, Validators.minLength(3))
    cidade: FormControl = new FormControl(null, Validators.minLength(3))
    estado: FormControl = new FormControl(null, Validators.minLength(3))
    formadeEntrega: FormControl = new FormControl(null, [Validators.required])

    constructor(private service: FornecedorService, private toast: ToastrService, private router: Router) { }

    ngOnInit(): void {
      this.capitalizeFirstLetterOnChanges(this.nome);
      this.capitalizeFirstLetterOnChanges(this.rua);
      this.capitalizeFirstLetterOnChanges(this.bairro);
      this.capitalizeFirstLetterOnChanges(this.cidade);
      this.capitalizeFirstLetterOnChanges(this.complemento);
    }
  
    capitalizeFirstLetterOnChanges(formControl: FormControl): void {
      formControl.valueChanges.subscribe(value => {
        const capitalizedValue = this.capitalizeFirstLetter(value);
        formControl.setValue(capitalizedValue, { emitEvent: false });
      });
    }
  
    capitalizeFirstLetter(value: string): string {
      if (!value) return value;
      return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    }

    create(): void {
      this.verificaDocumento()
      this.service.create(this.fornecedor).subscribe(resposta => {
        this.toast.success('Fornecedor cadastrado com sucesso', 'Cadastro')
        this.router.navigate(['fornecedor'])
      }, ex => {
        if(ex.error.erros) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message)
          })
        } else {
          this.toast.error(ex.error.message)
        }
      })
    }

    verificaDocumento(): void {
      if(this.fornecedor.documento.length == 11){
        this.fornecedor.tipoFornecedor = 'CPF'
      } else if(this.fornecedor.documento.length == 14) {
        this.fornecedor.tipoFornecedor = 'CNPJ'
      } else {
        this.toast.error("CPF/CNPJ Invalido")
      }
    }

    validaCampos(): boolean {
      return this.nome.valid && this.documento.valid && this.email.valid &&
      this.email.valid && this.telefone.valid && this.cep.valid && this.rua.valid &&
      this.numero.valid && this.bairro.valid && this.complemento.valid && this.cidade.valid &&
      this.formadeEntrega.valid
    }

  }
