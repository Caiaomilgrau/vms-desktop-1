# VMS Desktop - Visualizador de Dados (Read-Only)

## 📋 Visão Geral

Este é um aplicativo desktop desenvolvido com **Electron**, **Vite**, **Vanilla JavaScript** e **SQLite**. O sistema foi transformado em um **visualizador de dados especializado (Read-Only)**, projetado para consulta simplificada de usuários, serviços, agendamentos e orçamentos. Todas as operações de escrita, edição e exclusão foram removidas para garantir a integridade dos dados e focar na funcionalidade de listagem.

## 🏗️ Arquitetura do Projeto

O projeto segue o modelo de processos do Electron, otimizado para leitura:

### 1. Main Process (Backend/Consulta)
Localizado em `src/Main_back`, esta camada é responsável por:
- **Gerenciamento de Janelas**: Criação e controle da janela do navegador (`src/main.js`).
- **Banco de Dados**: Conexão segura com SQLite via `better-sqlite3` (`src/Main_back/Database`).
- **Controladores (Controllers)**: Orquestração de consultas e formatação de respostas (`src/Main_back/Controllers`).
- **Modelos (Models)**: Execução exclusiva de queries `SELECT` no banco de dados (`src/Main_back/Models`).
- **IPC (Inter-Process Communication)**: Listeners dedicados apenas a solicitações de listagem e busca por ID.

### 2. Renderer Process (Frontend/Interface de Usuário)
Localizado em `src/Renderer_front`, esta camada é responsável por:
- **Views**: Componentes baseados em classes para renderização dinâmica de tabelas e listas (`src/Renderer_front/Views`).
- **Services**: Gerenciamento de rotas e chamadas para a API de leitura exposta (`src/Renderer_front/Services`).
- **Roteamento**: Sistema SPA simplificado focado em navegação entre listagens (`src/renderer.js` e `Rotas.js`).

## 🔄 Fluxo da Informação

O fluxo de dados é estritamente de consulta:

1.  **Navegação**: O usuário seleciona uma categoria no menu lateral.
2.  **View/Service**: O frontend solicita a listagem dos dados ao disparar a rota.
3.  **Bridge (Preload)**: A chamada passa pela API segura `window.api.listar...()`.
4.  **IPC Invoke**: O processo de renderização solicita os dados ao processo principal.
5.  **Main Process**: O backend intercepta a solicitação de consulta.
6.  **Controller & Model**: O Controller solicita os dados ao Model, que executa o `SELECT` no SQLite.
7.  **Retorno**: Os dados retornam ao frontend para serem renderizados em formato de tabela.

## 🚀 Como Executar o Projeto

Certifique-se de ter o Node.js instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o visualizador em modo de desenvolvimento
npm run dev

# 3. Gerar executável (Build)
npm run build
```

## 📂 Estrutura de Pastas

```
src/
├── Main_back/           # Processo Principal (Consultas)
│   ├── Controllers/     # Lógica de Recuperação de Dados
│   ├── Database/        # Banco de Dados SQLite
│   └── Models/          # Queries SQL (Somente Leitura)
├── Renderer_front/      # Interface (Somente Listagem)
│   ├── Services/        # Navegação e Chamadas de API
│   └── Views/           # Tabelas e Listas
├── main.js              # Inicialização do Backend
├── preload.js           # API de Comunicação Segura
└── renderer.js          # Inicialização do Frontend
```

