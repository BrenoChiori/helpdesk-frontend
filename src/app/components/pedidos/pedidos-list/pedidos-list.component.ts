import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedidos } from 'src/app/models/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css']
})
export class PedidosListComponent implements OnInit {

  ELEMENT_DATA: Pedidos[] = []
  FILTERED_DATA: Pedidos[] = []

  displayedColumns: string[] = ['id', 'dataPedido', 'dataEntrega', 'status', 'valorTotal', 'acoes']
  dataSource = new MatTableDataSource<Pedidos>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: PedidosService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Pedidos>(resposta)
      this.dataSource.paginator = this.paginator
    })
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

  orderByStatus(status: any): void {
    let list: Pedidos[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element)
      }
    })
    this.FILTERED_DATA = list
    this.dataSource = new MatTableDataSource<Pedidos>(list);
    this.dataSource.paginator = this.paginator
  }

}
