import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
  imports: [CommonModule, RouterModule]
})
export class ListaUsuarios implements OnInit{

  usuarios: Usuario[] = [];
  carregando = true;
  erro = '';

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;
    this.usuarioService.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.carregando = false;
        this.cdr.detectChanges();//Corrige o bug do array vazio no frontend
      },
      error: (err) => {
        this.erro = 'Erro ao carregar usuários.';
        this.carregando = false;
        console.error(err);
      }
    });
  }

  deletarUsuario(id: number | undefined) {
    if (!id) return;

    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluir(id).subscribe({
        next: () => {
          
          this.usuarios = this.usuarios.filter(u => u.id !== id);
          alert('Usuário removido com sucesso!');
        },
        error: (err) => {
          alert('Erro ao excluir usuário.');
          console.error(err);
        }
      });
    }
  }

}
