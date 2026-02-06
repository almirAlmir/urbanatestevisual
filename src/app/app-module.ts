import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LoginComponent } from './components/login/login';
import { Cadastro } from './components/cadastro/cadastro';
import { ListaUsuarios } from './components/lista-usuarios/lista-usuarios';
import { GestaoCartoes } from './components/gestao-cartoes/gestao-cartoes';
import { MeusCartoes } from './components/meus-cartoes/meus-cartoes';
import { MeuPerfil } from './components/meu-perfil/meu-perfil';
import { NavbarComponent } from './components/navbar/navbar';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginComponent,
    Cadastro,
    ListaUsuarios,
    GestaoCartoes,
    MeusCartoes,
    MeuPerfil,
    NavbarComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
