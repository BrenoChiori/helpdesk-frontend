import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pedidos } from 'src/app/models/pedidos';

@Component({
  selector: 'app-pedidos-create',
  templateUrl: './pedidos-create.component.html',
  styleUrls: ['./pedidos-create.component.css']
})
export class PedidosCreateComponent implements OnInit {

  pedidos: Pedidos = {
    id: '',
    dataPedido: '',
    dataEntrega: '',
    status: '',
    valorTotal: 0,
  }

  dataPedido: FormControl = new FormControl(null, Validators.required)
  dataEntrega: FormControl = new FormControl(null, Validators.required)
  status: FormControl = new FormControl(null, Validators.required)
  valorTotal: FormControl = new FormControl(null, Validators.required)

  constructor(
  ) { }

  ngOnInit(): void {
  }

  create() {
    
  }

  validaCampos(): boolean {
    return this.dataPedido.valid && this.dataEntrega.valid && this.status.valid && this.valorTotal.valid
  }

}