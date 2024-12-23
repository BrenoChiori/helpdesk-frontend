import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

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
    statusFornecedor: '',
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
    statusFornecedor: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private service: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fornecedor.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById() {
    this.service.findById(this.fornecedor.id).subscribe(resposta => {
      this.fornecedor = resposta
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  update(): void {
    this.service.update(this.fornecedor).subscribe(resposta => {
      this.toast.success('Fornecedor atualizado com sucesso', 'Atualizado fornecedor')
      this.router.navigate(['fornecedor'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.documento.valid && this.email.valid &&
    this.email.valid && this.telefone.valid && this.cep.valid && this.rua.valid &&
    this.numero.valid && this.bairro.valid && this.complemento.valid && this.cidade.valid &&
    this.formadeEntrega.valid && this.statusFornecedor.valid
  }
}
