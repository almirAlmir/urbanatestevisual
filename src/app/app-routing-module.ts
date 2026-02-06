import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login'
import { Cadastro } from './components/cadastro/cadastro';
import { ListaUsuarios } from './components/lista-usuarios/lista-usuarios';
import { GestaoCartoes } from './components/gestao-cartoes/gestao-cartoes';
import { MeusCartoes } from './components/meus-cartoes/meus-cartoes';
import { MeuPerfil } from './components/meu-perfil/meu-perfil';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona raiz para login
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: Cadastro },
  { path: 'usuarios', component: ListaUsuarios },
  { path: 'meus-cartoes', component: MeusCartoes },
  { path: 'usuarios/:id/cartoes', component: GestaoCartoes },
  { path: 'meu-perfil', component: MeuPerfil }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
