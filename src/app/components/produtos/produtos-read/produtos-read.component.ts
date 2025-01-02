import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produtos } from 'src/app/models/produtos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';

@Component({
  selector: 'app-produtos-read',
  templateUrl: './produtos-read.component.html',
  styleUrls: ['./produtos-read.component.css']
})
export class ProdutosReadComponent implements OnInit {

  produtos: Produtos = {
    id: '',
    marca: '',
    nomeProduto: '',
    fornecedor: ''
  }

  constructor(
    private produtosService: ProdtutosService,
    private fornecedorService: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

}
