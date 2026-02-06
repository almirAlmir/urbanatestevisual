import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartaoService } from '../../services/cartao';
import { Cartao } from '../../models/cartao';

@Component({
  selector: 'app-gestao-cartoes',
  standalone: true,
  templateUrl: './gestao-cartoes.html',
  styleUrl: './gestao-cartoes.css',
  imports: [CommonModule, RouterModule, FormsModule]
})
export class GestaoCartoes implements OnInit{

  usuarioId: number = 0;
  cartoes: Cartao[] = [];
  
  
  novoCartao: Cartao = {
    nome: '',
    //numeroCartao: '',
    tipo: 'COMUM',
    usuarioId: 0,
    status: true
  };

  carregando = false;

  constructor(
    private route: ActivatedRoute, // Serviço que lê a URL
    private router: Router,
    private cartaoService: CartaoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const idRota = this.route.snapshot.paramMap.get('id');
    
    if (idRota) {
      this.usuarioId = Number(idRota);
      this.novoCartao.usuarioId = this.usuarioId;
      this.carregarCartoes();
    }
  }

  carregarCartoes() {
    this.carregando = true;
    
    this.cartaoService.listarPorUsuario(this.usuarioId).subscribe({
      next: (dados) => {
        this.cartoes = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar cartões', err);
        this.carregando = false;
      }
    });
  }

  salvar() {
    
    this.novoCartao.usuarioId = this.usuarioId;

    this.cartaoService.salvar(this.novoCartao).subscribe({
      next: () => {
        alert('Cartão cadastrado com sucesso!');
        
        this.novoCartao = { 
            nome: '', numeroCartao: '', tipo: 'COMUM', 
            usuarioId: this.usuarioId, status: true 
        };
        this.carregarCartoes(); // Atualiza a lista
      },
      error: (err) => {
        alert('Erro ao salvar cartão.');
        console.error(err);
      }
    });
  }
  
  voltar() {
    this.router.navigate(['/usuarios']);
  }

  alternarStatus(cartao: Cartao) {
    const novoStatus = !cartao.status; // Inverte: Se true vira false, se false vira true
    const acao = novoStatus ? 'ATIVAR' : 'BLOQUEAR';

    if (confirm(`Tem certeza que deseja ${acao} o cartão de final ${cartao.numeroCartao?.slice(-4)}?`)) {
      
      // O ID é obrigatório
      if (!cartao.id) return;

      this.cartaoService.alterarStatus(cartao.id, novoStatus).subscribe({
        next: (cartaoAtualizado) => {
          // Atualiza a lista localmente para refletir a mudança instantânea
          const index = this.cartoes.findIndex(c => c.id === cartao.id);
          if (index !== -1) {
            this.cartoes[index] = cartaoAtualizado;
          }
          this.cdr.detectChanges(); // Atualiza a tela
        },
        error: (err) => {
          alert('Erro ao alterar status do cartão.');
          console.error(err);
        }
      });
    }
  }

}
