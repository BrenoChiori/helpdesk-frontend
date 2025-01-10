import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${API_CONFIG.baseUrl}/pedidos/${id}`)
  }

  findAll(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${API_CONFIG.baseUrl}/pedidos`)
  }

  create(pedido: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(`${API_CONFIG.baseUrl}/pedidos`, pedido)
  }


}
