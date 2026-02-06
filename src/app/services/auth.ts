import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly apiUrl = '/usuario-service/usuario';
  
  private readonly STORAGE_KEY = 'usuario_logado';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(usuarios => {
        //O login por email nao vai incluir case sensitive pra facilitar
        const user = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user) {
          
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        }
        return user;
      })
    );
  }

  
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY); //Remove o usuario da memoria
    this.router.navigate(['/login']); //Joga no login
  }

  getUsuarioLogado(): Usuario | null {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    return dados ? JSON.parse(dados) : null;
  }

  isAdmin(): boolean {
    const user = this.getUsuarioLogado();
    return user?.tipo === 'ADMIN';
  }

  estaAutenticado(): boolean {
    return !!this.getUsuarioLogado();
  }
}
