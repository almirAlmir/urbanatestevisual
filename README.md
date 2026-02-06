# 🚌 VEM - Sistema de Bilhetagem (Frontend)

Este é o **Frontend** do sistema VEM (Voucher Eletrônico Municipal?), desenvolvido em **Angular**. O sistema permite a gestão de usuários e cartões de transporte/acesso, com perfis diferenciados para Administradores e Usuários Comuns.

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

Embora o sistema se conecte ao banco de dados real para verificar se o e-mail existe, a **camada de segurança é simplificada** para fins didáticos:

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