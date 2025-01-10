import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Pedidos } from 'src/app/models/pedidos';
import { Produtos } from 'src/app/models/produtos';
import { ProdutosPedidos } from 'src/app/models/produtosPedidos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos-read',
  templateUrl: './pedidos-read.component.html',
  styleUrls: ['./pedidos-read.component.css']
})

export class PedidosReadComponent implements OnInit {
  ELEMENT_DATA: ProdutosPedidos[] = []
  
  displayedColumns: string[] = ['produto.id', 'marca', 'produto.nome', 'fornecedor.nome', 'quantidade', 'valor']
  dataSource = new MatTableDataSource<ProdutosPedidos>(this.ELEMENT_DATA)
  
  pedidos: Pedidos;
  produtosPedidos: ProdutosPedidos;

  constructor(
    private servicePedidos: PedidosService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pedidos = new Pedidos();
    this.pedidos.listaProdutos = [];
    this.produtosPedidos = new ProdutosPedidos();

    this.pedidos.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  retornaStatus(status: any): string {
    if(status == 'ABERTO') {
      return 'ABERTO'
    } else if(status == 'ANDAMENTO') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  
  findById():void {
    this.servicePedidos.findById(this.pedidos.id).subscribe(resposta => {
      this.pedidos = resposta
      this.dataSource.data = this.pedidos.listaProdutos
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }
}