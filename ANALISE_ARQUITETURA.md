# Análise de Arquitetura e Fluxo do Projeto VMS Desktop

> **Última Atualização:** 31/01/2026

Este documento descreve a arquitetura atual do sistema, padrões identificados, e pontos de atenção para correções e melhorias.

## 1. Visão Geral da Arquitetura
O projeto é uma aplicação Desktop desenvolvida com **Electron**, utilizando **Vite** para o build system e **SQLite** (`better-sqlite3`) como banco de dados local.

### Fluxo de Dados (IPC)
A comunicação segue o padrão de segurança do Electron com `ContextBridge`:
1.  **Frontend (Renderer)**: Solicita ações via `window.api` (definida no `preload.js`).
2.  **Preload**: Intermedia a chamada usando `ipcRenderer.invoke`.
3.  **Backend (Main)**: Recebe a mensagem via `ipcMain.handle`, chama o Controller apropriado e retorna a resposta.

## 2. Estrutura de Pastas e Responsabilidades

### `src/Main_back` (Backend / Main Process)
Responsável pela lógica de negócios, acesso a dados e orquestração.
*   **Database/**: Configuração do SQLite e scripts de criação de tabelas (`db.js`).
*   **Models/**: Acesso direto ao banco (DAO Pattern). Executa queries SQL (INSERT, SELECT, UPDATE).
    *   *Padrão*: Classes (ex: `Usuarios`, `Servicos`) com métodos CRUD.
*   **Controllers/**: Regra de negócio e validação.
    *   *Padrão*: Recebe dados "crus" do frontend, valida, mapeia para o formato do banco (DTO implícito) e chama o Model.

### `src/Renderer_front` (Frontend / Renderer Process)
Responsável pela interface gráfica e interação com o usuário.
*   **Views/**: Organizado por domínio (`Usuario`, `Servico`, etc.).
    *   **Classes View** (ex: `UsuariosView.js`): Responsáveis apenas por gerar Strings HTML. *Atenção: Uso de `innerHTML` (Risco XSS).*
    *   **Logica de Página** (ex: `UsuarioListar.js`): Atua como um "Page Controller". Busca dados via API, chama a View para renderizar o HTML e adiciona Event Listeners ao DOM.

## 3. Padrões de Programação Identificados

*   **Padrão de Nomenclatura de Tabelas**: O banco utiliza prefixo `tbl_` e singular (ex: `tbl_usuario`, `tbl_servico`). *Correções recentes garantiram consistência nesse padrão.*
*   **Soft Delete**: O sistema implementa exclusão lógica verificando o campo `excluido_em IS NULL` nas consultas.
*   **Mapeamento de Dados (Controller)**:
    *   Frontend envia chaves genéricas (`nome`, `email`).
    *   Controller traduz para chaves do banco (`nome_usuario`, `email_usuario`).

## 4. Análise de Qualidade e Pontos de Atenção

### 🔴 Crítico (Bugs e Falhas)
1.  **Duplicidade de Método em `Servicos.js`**:
    *   A classe `Servicos` possui **dois** métodos nomeados `remover`. O primeiro tenta manipular um array inexistente (`this.servicos.splice`) e o segundo faz a query correta no SQL. O JavaScript manterá apenas o último, mas isso é um erro de código que deve ser limpo.
2.  **Risco de Segurança (XSS)**:
    *   As Views (`UsuariosView.js`) utilizam template strings inseridas via `innerHTML` sem sanitização. Nomes de usuários contendo scripts maliciosos serão executados.

### 🟡 Importante (Dívida Técnica)
1.  **Inconsistência de Implementação (Serviços)**:
    *   O módulo de Usuários está completo (Listar, Cadastrar, Editar).
    *   O módulo de `Servico` está incompleto no frontend (apenas `renderizarMenu` implementado em `ServicosView.js`).
2.  **Acoplamento View-DOM**:
    *   A lógica de eventos depende de seletores de ID globais fixos (`document.getElementById("form-usuario")`), o que dificulta componentização ou uso de múltiplos formulários.

### Status das Correções Anteriores
*   ✅ **Nomes de Tabelas**: Resolvido. `Usuarios.js` usa `tbl_usuario`.
*   ✅ **Falta de Campos**: `UsuarioController` agora trata defaults (telefone, foto) ou valida obrigatórios.

## 5. Próximos Passos Recomendados
1.  **Refatorar `Servicos.js`**: Remover o método `remover` duplicado.
2.  **Padronizar Views**: Implementar as telas de formulário e listagem para `Serviços`, seguindo o padrão de `Usuarios`.
3.  **Sanitização**: Implementar função básica de escape de HTML nas Views.
