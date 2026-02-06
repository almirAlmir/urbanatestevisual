import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true, // Já deve estar true
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class LoginComponent implements OnInit{

  email: string = '';
  erro: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    localStorage.removeItem('usuario_logado');
  }

  entrar() {
    this.erro = '';
    
    if (!this.email) {
      this.erro = 'Por favor, digite seu e-mail.';
      return;
    }

    this.loading = true;

    this.authService.login(this.email).subscribe({
      next: (usuario) => {
        this.loading = false;
        
        if (usuario) {
          //Pra simular a autorização de usuario comum e admin
          if (usuario.tipo === 'ADMIN') {
            this.router.navigate(['/usuarios']);
          } else { //Utilizo o else pois não há outro tipo de usuário alem do ADMIN e o comum, porém pode ser um ponto de refactor futuro
            this.router.navigate(['/meus-cartoes']);
          }
        } else {
          this.erro = 'Usuário não encontrado. Verifique o e-mail';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.erro = 'Erro ao conectar com o servidor. Verifique o funcionamento do gateway';
      }
    });
  }
}
