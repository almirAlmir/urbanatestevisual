import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Para navegação
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class Cadastro {

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'COMUM' // Definimos explicitamente como COMUM
  };

  loading = false;
  mensagem = '';
  sucesso = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  cadastrar() {
    this.loading = true;
    this.mensagem = '';

    this.usuarioService.salvar(this.usuario).subscribe({
      next: (res) => {
        this.loading = false;
        this.sucesso = true;
        this.mensagem = 'Cadastro realizado com sucesso! Redirecionando...';
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        this.loading = false;
        this.sucesso = false;
        console.error(err);
        
        this.mensagem = 'Erro ao cadastrar. Verifique se o e-mail já existe.';
      }
    });
  }
}

