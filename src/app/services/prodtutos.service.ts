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

  findAll(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${API_CONFIG.baseUrl}/produto`)
  }
}
