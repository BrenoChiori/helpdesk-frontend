import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/models/fornecedor';
import { Pedidos } from 'src/app/models/pedidos';
import { Produtos } from 'src/app/models/produtos';
import { ProdutosPedidos } from 'src/app/models/produtosPedidos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';
import { format } from 'date-fns';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pedidos-update',
  templateUrl: './pedidos-update.component.html',
  styleUrls: ['./pedidos-update.component.css']
})
export class PedidosUpdateComponent implements OnInit {

  ELEMENT_DATA: ProdutosPedidos[] = []
  
  displayedColumns: string[] = ['produto.nome', 'fornecedor.nome', 'quantidade', 'valor', 'acoes']
  dataSource = new MatTableDataSource<ProdutosPedidos>(this.ELEMENT_DATA)
  
  pedidos: Pedidos;
  produtosPedidos: ProdutosPedidos;
  fornecedores: Fornecedor[] = []
  produtos: Produtos[] = []

  dataEntrega: FormControl = new FormControl(null, Validators.required)
  status: FormControl = new FormControl(null, Validators.required)
  valorTotal: FormControl = new FormControl(null, Validators.required);

  constructor(
    private servicePedidos: PedidosService,
    private serviceProdutos: ProdtutosService,
    private serviceFornecedor: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pedidos = new Pedidos();
    this.pedidos.listaProdutos = [];
    this.produtosPedidos = new ProdutosPedidos();
    
    this.pedidos.id = this.route.snapshot.paramMap.get('id')
    this.findById()
    this.findAllProdutos()
    this.findAllFornecedores()
  }

  findAllFornecedores(): void {
    this.serviceFornecedor.findAll().subscribe(resposta => {
      this.fornecedores = resposta
    })
  }

  findAllProdutos(): void {
    this.serviceProdutos.findAll().subscribe(resposta => {
      this.produtos = resposta
    })
  }

  validaCampos(): boolean {
    return this.dataEntrega.valid && this.status.valid
  }

  editItem(index: number) {
    this.produtosPedidos = { ...this.ELEMENT_DATA[index] };
    this.deleteItem(index)
  }

  deleteItem(index: number) {
    this.pedidos.listaProdutos.splice(index, 1);
    this.ELEMENT_DATA.splice(index, 1)
    this.dataSource.data = this.ELEMENT_DATA
    this.calculaValorTotal()
  }

  calculaValorTotal() {
    let total = 0;
    this.pedidos.listaProdutos.forEach(produto => {
      total += produto.quantidade * produto.valor;
    });
    this.pedidos.valorTotal = total;
  }

  adicionarProdutoPedido() {
    this.pedidos.listaProdutos.push(this.produtosPedidos)
    this.ELEMENT_DATA.push(this.produtosPedidos)
    this.dataSource.data = this.ELEMENT_DATA
    this.calculaValorTotal()
    this.produtosPedidos = new ProdutosPedidos();
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

  findById(): void {
    this.servicePedidos.findById(this.pedidos.id).subscribe(resposta => {
      this.pedidos = resposta
      const [day, month, year] = this.pedidos.dataEntrega.split('/');
      this.dataEntrega.setValue(new Date(+year, +month - 1, +day));
      this.ELEMENT_DATA = [ ...this.pedidos.listaProdutos ];
      this.dataSource.data = this.ELEMENT_DATA;
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }

  update(): void {
    this.valorTotal.enable();
    this.pedidos.dataEntrega = format(new Date(this.dataEntrega.value), 'dd/MM/yyyy')
    console.log('Dados enviados para update:', this.pedidos);
    this.servicePedidos.update(this.pedidos).subscribe(resposta => {
      this.toast.success('Pedido Atualizado com sucesso', 'Atualizado pedido')
      this.router.navigate(['pedidos'])
    }, ex => {
      this.toast.error(ex.error.error)
    })
  }
}