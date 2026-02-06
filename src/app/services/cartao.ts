import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cartao } from '../models/cartao';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  
  private readonly apiUrl = '/cartao-service/cartao'; 

  constructor(private http: HttpClient) {}

  listarPorUsuario(usuarioId: number): Observable<Cartao[]> {
    
    return this.http.get<Cartao[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  salvar(cartao: Cartao): Observable<Cartao> {
    return this.http.post<Cartao>(this.apiUrl, cartao);
  }

  atualizar(cartao: Cartao): Observable<Cartao> {
    return this.http.put<Cartao>(`${this.apiUrl}/${cartao.id}`, cartao);
  }
  
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  alterarStatus(id: number, ativo: boolean): Observable<Cartao> {
  
  return this.http.patch<Cartao>(`${this.apiUrl}/${id}/status`, null, {
    params: {
      ativo: ativo.toString()
    }
  });
}

}
