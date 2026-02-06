import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartaoService } from '../../services/cartao';
import { AuthService } from '../../services/auth';
import { Cartao } from '../../models/cartao';

@Component({
  selector: 'app-meus-cartoes',
  standalone: true,
  templateUrl: './meus-cartoes.html',
  styleUrl: './meus-cartoes.css',
  imports: [CommonModule, FormsModule]
})
export class MeusCartoes {

  cartoes: Cartao[] = [];
  usuarioLogado: any = null;
  carregando = false;

  novoCartaoTipo: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR' = 'COMUM';

  constructor(
    private cartaoService: CartaoService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.usuarioLogado = this.authService.getUsuarioLogado();

    if (!this.usuarioLogado || !this.usuarioLogado.id) {
      alert('Sessão expirada. Faça login novamente.');
      this.router.navigate(['/login']);
      return;
    }

    
    this.carregarCartoes();
  }

  carregarCartoes() {
    this.carregando = true;
    this.cartaoService.listarPorUsuario(this.usuarioLogado.id).subscribe({
      next: (dados) => {
        this.cartoes = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar meus cartões', err);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  solicitarCartao() {
    if (!confirm(`Deseja solicitar um novo cartão do tipo ${this.novoCartaoTipo}?`)) return;

    const pedido: Cartao = {
      nome: `Meu Cartão ${this.novoCartaoTipo}`,
      tipo: this.novoCartaoTipo,
      usuarioId: this.usuarioLogado.id,
      status: true
    };

    this.cartaoService.salvar(pedido).subscribe({
      next: () => {
        alert('Cartão solicitado com sucesso!');
        this.carregarCartoes();
      },
      error: (err) => {
        alert('Erro ao solicitar cartão.');
      }
    });
  }

  excluirCartao(cartao: Cartao) {
    if (confirm(`Tem certeza que deseja excluir o cartão final ${cartao.numeroCartao?.slice(-4)}?`)) {
      
      if (!cartao.id) return;

      this.cartaoService.remover(cartao.id).subscribe({
        next: () => {
          
          this.cartoes = this.cartoes.filter(c => c.id !== cartao.id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Erro ao excluir cartão.');
          console.error(err);
        }
      });
    }
  }

  sair() {
    this.authService.logout();
  }
}
