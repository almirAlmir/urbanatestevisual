import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly apiUrl = '/usuario-service/usuario';

  constructor(private http: HttpClient){
    console.log('UsuarioService rodando com URL:', this.apiUrl);
    
  }

  salvar(usuario:Usuario): Observable<Usuario>{
    
    return this.http.post<Usuario>(this.apiUrl, usuario); 
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
