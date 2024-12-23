import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${API_CONFIG.baseUrl}/fornecedor`)
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${API_CONFIG.baseUrl}/fornecedor`, fornecedor)
  }
}
