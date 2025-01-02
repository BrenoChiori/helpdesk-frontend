import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produtos } from 'src/app/models/produtos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';

@Component({
  selector: 'app-produtos-update',
  templateUrl: './produtos-update.component.html',
  styleUrls: ['./produtos-update.component.css']
})
export class ProdutosUpdateComponent implements OnInit {

  fornecedores: Fornecedor[] = []

  produtos: Produtos = {
    id: '',
    marca: '',
    nomeProduto: '',
    fornecedor: ''
  }

  nomeProduto: FormControl = new FormControl(null, Validators.minLength(3))
  marca: FormControl = new FormControl(null, Validators.required)
  fornecedor: FormControl = new FormControl(null, Validators.required)

  constructor(
    private produtosService: ProdtutosService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllFornecedores()
    this.produtos.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById() {
    this.produtosService.findById(this.produtos.id).subscribe(resposta => {
      this.produtos = resposta
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  findAllFornecedores() {
    this.fornecedorService.findAll().subscribe(resposta => {
      this.fornecedores = resposta
    })
  }

  update(): void {
    this.produtosService.update(this.produtos).subscribe(resposta => {
      this.toast.success('Produto Atualizado com sucesso', 'Atualizado produto')
      this.router.navigate(['produtos'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  validaCampos(): boolean {
    return this.nomeProduto.valid && this.marca.valid && this.fornecedor.valid
  }
}