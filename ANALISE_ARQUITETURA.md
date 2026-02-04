# Análise de Arquitetura e Fluxo do Projeto VMS Desktop (Read-Only)

> **Última Atualização:** 31/01/2026
> **Status:** Refatorado para Visualização de Dados (Somente Leitura)

Este documento descreve a arquitetura atual do sistema como um visualizador de dados estático.

## 1. Visão Geral da Arquitetura
O projeto é uma aplicação Desktop desenvolvida com **Electron**, utilizando **Vite** e **SQLite** (`better-sqlite3`). A aplicação foi simplificada para remover todas as capacidades de escrita, edição e exclusão.

### Fluxo de Dados (Consulta IPC)
A comunicação segue o padrão de segurança do Electron com `ContextBridge`:
1.  **Frontend (Renderer)**: Solicita listagens via `window.api.listar...`.
2.  **Preload**: Intermedia a chamada usando `ipcRenderer.invoke` apenas para métodos de leitura.
3.  **Backend (Main)**: Recebe a mensagem via `ipcMain.handle`, chama o Controller apropriado para buscar dados e retorna a resposta.

## 2. Estrutura de Pastas e Responsabilidades

### `src/Main_back` (Backend / Main Process)
Focado exclusivamente na recuperação de dados do banco.
*   **Database/**: Configuração do SQLite (`db.js`).
*   **Models/**: Acesso direto ao banco (DAO Pattern). Executa apenas queries `SELECT`.
    *   *Padrão*: Classes com métodos `listarTodos` e `buscarPorId`.
*   **Controllers/**: Orquestração de consultas e mapeamento de chaves de banco para o frontend.

### `src/Renderer_front` (Frontend / Renderer Process)
Focado no consumo e exibição de dados.
*   **Views/**:
    *   **Classes View**: Responsáveis por gerar o template HTML das tabelas.
    *   **Logica de Página** (`*Listar.js`): Controladores de interface que buscam dados e gerenciam a renderização.

## 3. Padrões de Programação

*   **Estratégia de Somente Leitura**: Todas as rotas de criação (`/uuid_criar`) e botões de ação (Editar/Excluir) foram removidos tanto do frontend quanto do backend.
*   **Segurança IPC**: O `preload.js` não expõe métodos que permitam alteração no banco de dados.
*   **Soft Delete Management**: As queries `SELECT` continuam respeitando o filtro `excluido_em IS NULL` para garantir que apenas dados ativos sejam exibidos.

## 4. Análise de Qualidade e Mudanças

*   ✅ **Clean Code**: Métodos duplicados e lógica de escrita legada foram removidos de todos os Models e Controllers.
*   ✅ **Estrutura SPA**: O roteador central em `Rotas.js` foi limpo, mantendo apenas navegação entre menus e listas.
*   ✅ **Integridade**: A exclusão de formulários físicos garante que não existam pontos de entrada de dados não autorizados.

## 5. Manutenção e Melhorias Futuras
1.  **Exportação**: Implementar função de exportar listagens para CSV ou PDF (Leitura Estendida).
2.  **Filtros Avançados**: Adicionar busca textual em tempo real nas tabelas de listagem.
3.  **Sanitização**: Refinar o escape de HTML nas Views para evitar XSS em dados importados.

