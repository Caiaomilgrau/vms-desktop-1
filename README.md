# VMS Desktop - Documentação do Projeto

## 📋 Visão Geral

Este é um aplicativo desktop desenvolvido com **Electron**, **Vite**, **Vanilla JavaScript** e **SQLite**. O sistema foi projetado para gerenciar usuários, serviços e orçamentos, utilizando uma arquitetura modular que separa o processo principal (Backend) da interface do usuário (Frontend/Renderer).

## 🏗️ Arquitetura do Projeto

O projeto segue o modelo de processos do Electron, separado em duas camadas principais:

### 1. Main Process (Backend/Lógica)
Localizado em `src/Main_back`, esta camada é responsável por:
- **Gerenciamento de Janelas**: Criação e controle da janela do navegador (`src/main.js`).
- **Banco de Dados**: Conexão com SQLite via `better-sqlite3` (`src/Main_back/Database`).
- **Controladores (Controllers)**: Regras de negócio e orquestração (`src/Main_back/Controllers`).
- **Modelos (Models)**: Acesso direto aos dados e execução de queries SQL (`src/Main_back/Models`).
- **IPC (Inter-Process Communication)**: Escuta eventos vindos do frontend para executar ações no backend.

### 2. Renderer Process (Frontend/Interface)
Localizado em `src/Renderer_front`, esta camada é responsável por:
- **Views**: Classes que geram o HTML dinamicamente (`src/Renderer_front/Views`).
- **Services**: Lógica de cliente, rotas e chamadas para a API exposta (`src/Renderer_front/Services`).
- **Roteamento**: Um sistema simples de SPA (Single Page Application) baseado em hash na URL (`src/renderer.js` e `Rotas.js`).

## 🔄 Fluxo da Informação

O fluxo de dados segue um padrão unidirecional e baseado em eventos:

1.  **Interação do Usuário**: O usuário interage com a interface (ex: clica em "Salvar").
2.  **View/Service**: O código JavaScript do frontend captura o evento.
3.  **Bridge (Preload)**: A função chama `window.api.metodo()`, que é exposta pelo `preload.js`.
4.  **IPC Invoke**: O `preload.js` envia uma mensagem assíncrona (`ipcRenderer.invoke`) ao processo principal.
5.  **Main Process**: O arquivo `main.js` intercepta a mensagem (`ipcMain.handle`).
6.  **Controller**: O `main.js` delega a tarefa para o Controller específico (ex: `UsuarioController`).
7.  **Model**: O Controller valida os dados e chama o Model (ex: `Usuarios.js`).
8.  **Database**: O Model executa a query SQL no banco de dados SQLite (`vms.db`).
9.  **Retorno**: O resultado percorre o caminho inverso: Model -> Controller -> Main -> Preload -> Frontend.

## 🚀 Como Executar o Projeto

Certifique-se de ter o Node.js instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o projeto em modo de desenvolvimento
npm run dev

# 3. Gerar executável (Build)
npm run build
```

## 📂 Estrutura de Pastas Relevante

```
src/
├── Main_back/           # Código do Processo Principal
│   ├── Controllers/     # Lógica de Negócio
│   ├── Database/        # Configuração do SQLite
│   └── Models/          # Consultas SQL
├── Renderer_front/      # Código da Interface (Frontend)
│   ├── Services/        # Utilitários e Rotas
│   └── Views/           # Componentes Visuais (HTML Strings)
├── main.js              # Ponto de entrada do Processo Principal
├── preload.js           # Ponte de segurança (Context Bridge)
└── renderer.js          # Ponto de entrada da Interface
```
