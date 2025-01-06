import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produtos } from 'src/app/models/produtos';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdtutosService } from 'src/app/services/prodtutos.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {

  ELEMENT_DATA: Produtos[] = []
  FILTERED_DATA: Produtos[] = []

  displayedColumns: string[] = ['id', 'nomeProduto', 'marca', 'acoes']
  dataSource = new MatTableDataSource<Produtos>(this.ELEMENT_DATA)

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private produtoService: ProdtutosService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.produtoService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta
      this.dataSource = new MatTableDataSource<Produtos>(resposta)
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
