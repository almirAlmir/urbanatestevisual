import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {

  constructor(
    public authService: AuthService, // Public para o HTML acessar
    private router: Router
  ) {}

  // Atalho para pegar o usuário no HTML de forma limpa
  get usuario(): Usuario | null {
    return this.authService.getUsuarioLogado();
  }

  sair() {
    this.authService.logout();
    
  }
}