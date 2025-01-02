import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produtos } from '../models/produtos';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ProdtutosService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Produtos> {
    return this.http.get<Produtos>(`${API_CONFIG.baseUrl}/produto/${id}`)
  }

  findAll(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${API_CONFIG.baseUrl}/produto`)
  }

  create(prodtutos: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(`${API_CONFIG.baseUrl}/produto`, prodtutos)
  }

  update(produtos: Produtos): Observable<Produtos> {
    return this.http.put<Produtos>(`${API_CONFIG.baseUrl}/produto/${produtos.id}`, produtos);
  }
  
}
