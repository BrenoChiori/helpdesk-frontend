import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {

  ELEMENT_DATA: Fornecedor[] = []
  FILTERED_DATA: Fornecedor[] = []

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'rua', 'numero', 'bairro', 'complemento', 'cidade',  'statusFornecedor', 'acoes']
  dataSource = new MatTableDataSource<Fornecedor>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private service: FornecedorService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Fornecedor>(resposta)
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  orderByStatus(status: any): void {
    let list: Fornecedor[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.statusFornecedor == status) {
        list.push(element)
      }
    })

    this.FILTERED_DATA = list
    this.dataSource = new MatTableDataSource<Fornecedor>(list)
    this.dataSource.paginator = this.paginator
  }

}
