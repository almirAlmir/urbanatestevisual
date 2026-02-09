# 🚌 Sistema de Bilhetagem (Frontend)

Este é o **Frontend** do sistema, desenvolvido em **Angular**. O sistema permite a gestão de usuários e cartões de transporte/acesso, com perfis diferenciados para Administradores e Usuários Comuns.

# 📋 Guia de Uso da Aplicação

Este sistema simula um ambiente de bilhetagem eletrónica com dois perfis distintos: **Administrador** e **Utilizador Comum**. Abaixo, encontras o passo a passo para testar cada fluxo.

## 🚀 Pré-requisitos (Antes de Começar) acesse o backend em: https://github.com/almirAlmir/urbanatesteapi

1.  **Backend:** Certifica-te de que todos os microsserviços estão a rodar na seguinte ordem:
    1.  `service-discovery` (Porta 8761)
    2.  `usuario-service` (Porta 8081)
    3.  `cartao-service` (Porta 8082)
    4.  `api-gateway` (Porta 8080)
2.  **Frontend:** A aplicação Angular deve estar rodando em `http://localhost:4200`.

---

## 👮‍♂️ Cenário A: Perfil Administrador

O Administrador é responsável pela gestão dos utilizadores e pela segurança dos cartões.

### 1. Login de Admin
* Acessa a `http://localhost:4200`.
* Utiliza o utilizador padrão criado via migração de base de dados no backend:
    * **E-mail:** `root@sistema.com`
    * **Senha:** `adm1234` (Pois é apenas um mock de login).
* Clica em **Entrar**. Será redirecionado para o *Painel Admin*.

### 2. Gestão de Utilizadores
* Na tela inicial (**Gestão de Utilizadores**), você verá uma lista de todos os cadastrados no sistema.
* **Ações Disponíveis:**
    * **Excluir Utilizador:** Clica no botão "Excluir" para remover um utilizador e todos os seus vínculos.
    * **Ver Cartões:** Clica no botão "Cartões" ao lado de um utilizador para gerir os cartões dele.

### 3. Bloqueio de Cartões (Segurança)
* Ao acessar aos cartões de um utilizador específico, o Admin **não pode excluir** cartões (para manter histórico), mas pode **Bloquear**.
* Identifica um cartão Ativo (Verde) e clica em **"🔒 Bloquear"**.
* O status mudará para "Bloqueado pelo Admin" (Vermelho). O utilizador dono do cartão não poderá usá-lo até que o desbloqueie.

---

## 👤 Cenário B: Perfil Utilizador Comum

O Utilizador Comum tem autonomia para gerir os seus próprios cartões e dados pessoais.

### 1. Registo (Novo Utilizador)
* Na tela de Login, clica em **"Cadastre-se"**.
* Preenche Nome, E-mail e Senha.
* Ao clicar em Salvar, será redirecionado para o Login.

### 2. Login de Utilizador
* Entra com o e-mail que acabou de registar.
* O sistema identificará que é um perfil `COMUM` e levará para a tela **Meus Cartões**.

### 3. Solicitação de Cartão
* No painel esquerdo ("Solicitar Novo Cartão"), escolhe o tipo desejado: *Comum, Estudante ou Trabalhador*.
* Clica em **"+ Pedir Cartão"**.
* O sistema gerará um número de cartão aleatório automaticamente e ele aparecerá na tua lista instantaneamente.

### 4. Gestão de Cartões Próprios
* Diferente do Admin, você é dono do seu cartão.
* Clica no botão **"🗑 Excluir"** para remover definitivamente um cartão antigo ou perdido.

### 5. Meu Perfil
* No menu superior, clica em **"👤 Perfil"**.
* Pode alterar o seu **Nome** ou **Senha**.
* *Nota:* O e-mail não pode ser alterado nesta tela por ser a tua chave de acesso(Um atacante poderia facilmente invadir a conta e alterar a chave de acesso, por esse motivo o impedimento em editar este campo).
* **Zona de Perigo:** No rodapé, há a opção de "Excluir Conta", que remove o acesso e todos os seus dados do sistema.

## 🚀 Funcionalidades

* **Autenticação:** Login e Cadastro de novos usuários.
* **Perfil de Administrador:**
    * Listagem de todos os usuários.
    * Gestão de cartões de terceiros (Bloquear/Desbloquear).
    * Exclusão de usuários.
* **Perfil de Usuário Comum:**
    * Visualização dos próprios cartões ("Meus Cartões").
    * Solicitação de novos cartões (Comum, Estudante, Trabalhador).
    * Exclusão de seus próprios cartões.
    * Edição de Perfil (Nome, Senha) e Auto-exclusão de conta.
* **Interface:** Responsiva e dinâmica (Navbar adapta-se ao usuário logado).

## 🛠️ Tecnologias

* **Angular** (v17+ Standalone Components)
* **Bootstrap 5** (Estilização)
* **TypeScript**

---

## ⚙️ Pré-requisitos

Para rodar este projeto, você precisa ter instalado:
* [Node.js](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* O **Backend** do sistema rodando localmente.

## 📦 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repo-frontend>
    cd vem-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Backend:**
    O frontend espera que o **API Gateway** esteja rodando na porta **8080**.
    * O arquivo `proxy.conf.json` já está configurado para redirecionar chamadas `/usuario-service` e `/cartao-service` para `http://localhost:8080`.

4.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm start
    # Ou: ng serve
    ```

5.  **Acesse:**
    Abra o navegador em `http://localhost:4200`.

---

## 🔐 Sobre o Login (Mock/Simulação)

Embora o sistema se conecte ao banco de dados real para verificar se o e-mail existe, a **camada de segurança é simplificada** visto que o Login não foi implementado no backend:

1.  **Validação:** O sistema busca o usuário pelo e-mail no Backend (`GET /usuario`). Se encontrar, permite a entrada.
2.  **Sessão:** Não utilizamos Tokens (JWT). A sessão é mantida salvando o objeto do usuário no `localStorage` do navegador.
3.  **Segurança:** A proteção de rotas (Guards) verifica apenas a presença desse objeto no `localStorage`. Em um ambiente de produção real, seria necessário implementar OAuth2 ou JWT.

### 🧪 Usuários para Teste

Se você já rodou os scripts de carga do Backend (SQL), pode tentar:

* **Admin:** `admin@vem.com` (ou o e-mail que você definiu como `root`)
* **Comum:** Cadastre um novo usuário na tela de "Cadastre-se".

---

## 🔗 Repositório do Backend

Este frontend depende dos microsserviços (Usuario, Cartao, Gateway e Eureka).
Acesse o código do Backend aqui:

👉 **[Link para o Repositório do Backend](https://github.com/almirAlmir/urbanatesteapi)**
