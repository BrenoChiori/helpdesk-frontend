import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacao: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id')
    this.findById()
  }

  findById() {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta
      this.chamado.status = this.retornaStatus(resposta.status)
      this.chamado.prioridade = this.retornaPrioridade(resposta.prioridade)
    }, ex => {
      this.toastService.error(ex.error.error)
    })
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MEDIA'
    } else {
      return 'ALTA'
    }
  }

}