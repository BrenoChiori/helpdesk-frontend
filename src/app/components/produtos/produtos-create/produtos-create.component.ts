import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Produtos } from 'src/app/models/produtos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';

@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrls: ['./produtos-create.component.css']
})
export class ProdutosCreateComponent implements OnInit {

  fornecedores: Fornecedor[] = []

  produtos: Produtos = {
    id: '',
    marca: '',
    nomeProduto: '',
  }

  nomeProduto: FormControl = new FormControl(null, Validators.minLength(3))
  marca: FormControl = new FormControl(null, Validators.required)

  constructor(
    private produtosService: ProdtutosService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.produtosService.create(this.produtos).subscribe(resposta => {
      this.toast.success('Produto criado com sucesso', 'Novo Produto')
      this.router.navigate(['produtos'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  validaCampos(): boolean {
    return this.nomeProduto.valid && this.marca.valid
  }

}
