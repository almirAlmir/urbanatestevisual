import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  templateUrl: './meu-perfil.html',
  styleUrl: './meu-perfil.css',
  imports: [CommonModule, FormsModule]
})
export class MeuPerfil {

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'COMUM'
  };

  carregando = false;
  mensagem = '';
  tipoMensagem = ''; 

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLogado = this.authService.getUsuarioLogado();
    
    if (usuarioLogado?.id) {
      // Carrega os dados da sessão
      this.usuario = { ...usuarioLogado, senha: '' }; 
    } else {
      this.router.navigate(['/login']);
    }
  }

  salvarAlteracoes() {
    if (!this.usuario.id) return;
    this.carregando = true;
    this.mensagem = '';

    this.usuarioService.atualizar(this.usuario).subscribe({
      next: (usuarioAtualizado) => {
        this.carregando = false;
        this.mensagem = 'Dados atualizados com sucesso!';
        this.tipoMensagem = 'sucesso';
        // Atualiza a sessão
        localStorage.setItem('usuario_logado', JSON.stringify(usuarioAtualizado));
      },
      error: (err) => {
        this.carregando = false;
        this.mensagem = 'Erro ao atualizar. Tente novamente.';
        this.tipoMensagem = 'erro';
      }
    });
  }

  excluirConta() {
    if (confirm('ATENÇÃO: Tem certeza que deseja excluir sua conta?')) {
      if (!this.usuario.id) return;

      this.usuarioService.excluir(this.usuario.id).subscribe({
        next: () => {
          alert('Conta excluída. Esperamos que volte!');
          this.authService.logout();
        },
        error: () => alert('Erro ao excluir conta.')
      });
    }
  }

  voltar() {
    if (this.usuario.tipo === 'ADMIN') {
        this.router.navigate(['/usuarios']);
    } else {
        this.router.navigate(['/meus-cartoes']);
    }
  }
}
