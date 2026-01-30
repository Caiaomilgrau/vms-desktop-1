# Análise de Arquitetura e Fluxo - VMS Desktop

Este documento detalha inconsistências, erros de lógica e falhas de arquitetura identificadas no código fonte, com sugestões de correção.

## 🚨 Erros Críticos (Impedem o Funcionamento)

### 1. Inconsistência nos Nomes das Tabelas
*   **Problema**: No arquivo de inicialização do banco (`db.js`), a tabela é criada como **`tbl_usuario`** (singular). No entanto, no Model (`Usuarios.js`), todas as queries (INSERT, SELECT, UPDATE) tentam acessar **`tbl_usuarios`** (plural).
*   **Consequência**: O sistema quebrará imediatamente ao tentar listar ou cadastrar usuários com erro de "New table not found".
*   **Correção**: Padronizar o nome da tabela. Sugestão: Usar **`tbl_usuario`** em todos os lugares.

### 2. Mapeamento de Propriedades Incorreto (Frontend vs Backend vs Banco)
O fluxo de dados sofre de uma "Telefone sem fio", onde os nomes das propriedades mudam sem tratamento, causando inserção de valores `undefined` ou falha nas restrições `NOT NULL`.

| Camada | Arquivo | Propriedades Usadas |
| :--- | :--- | :--- |
| **View (Form)** | `UsuarioForm.js` | `nome`, `email`, `senha` |
| **Controller** | `UsuarioController.js` | `nome`, `email`, `senha` |
| **Model** | `Usuarios.js` | `nome_usuario`, `email_usuario`, `senha_usuario`, `telefone_usuario`, ... |
| **Banco** | `db.js` | `nome_usuario`, `email_usuario`, `senha_usuario`, `telefone_usuario`, ... |

*   **O Erro**: O Model espera receber `usuario.nome_usuario`, mas o Controller passa um objeto com `usuario.nome`.
*   **Consequência**: O comando SQL tenta inserir `undefined` em colunas `NOT NULL`, gerando erro no SQLite.

### 3. Falta de Campos Obrigatórios
*   **Problema**: A tabela `tbl_usuario` define `telefone_usuario`, `tipo_usuario` e `status_usuario` como **NOT NULL**. O formulário de cadastro (`UsuarioForm.js`) sequer coleta ou envia esses dados.
*   **Consequência**: Erro de constraint `NOT NULL` ao tentar salvar.

### 4. Referência a Campo Inexistente (`idade`)
*   **Problema**: O arquivo `UsuarioListar.js` tenta ler e exibir `usuario.idade`.
*   **Consequência**: Exibirá "undefined" na tela, pois a coluna `idade` não existe no banco de dados.

## ⚠️ Melhorias de Arquitetura e Segurança

### 1. Segurança (XSS)
*   **Análise**: O uso extensivo de `innerHTML` concatenado com strings do banco de dados (em `UsuariosView.js`) abre brechas para Cross-Site Scripting (XSS). Se um usuário malicioso conseguir inserir um script no nome do usuário, ele será executado na máquina de quem visualizar a lista.
*   **Sugestão**: Usar `document.createElement` e `textContent` para construir o DOM de forma segura, ou utilizar uma biblioteca leve de renderização que escape o HTML automaticamente.

### 2. Validação de Dados
*   **Análise**: A validação no `UsuarioController` é muito básica (`if (!usuario.nome ...)`).
*   **Sugestão**: Implementar uma camada de validação robusta (ex: verificar formato de email, complexidade de senha) antes de chamar o Model.

### 3. Organização do Código (Rotas e Eventos)
*   **Análise**: A ligação de eventos (addEventListener) dentro de `setTimeout` nos arquivos de View é uma prática frágil (Race Condition).
*   **Sugestão**: Utilizar o ciclo de vida do componente. Renderizar o HTML primeiro e retornar o Elemento DOM já com os eventos atrelados, ao invés de retornar uma string HTML e tentar buscar os elementos depois pelo ID.

### 4. Tratamento de Erros Silencioso
*   **Análise**: Em muitos catchs ou falhas, o sistema apenas retorna `false` ou loga no console, sem feedback visual claro para o usuário sobre *qual* foi o erro (ex: "Email já cadastrado").

## 🛠️ Plano de Ação Recomendado

1.  **Corrigir Banco de Dados**: Renomear tabelas ou queries para garantir consistência (`tbl_usuario`).
2.  **Padronizar DTO (Data Transfer Object)**: Decidir se frontend envia `nome` ou `nome_usuario`. Se enviar `nome`, o Controller deve fazer o mapeamento `nome -> nome_usuario` antes de passar para o Model.
3.  **Atualizar Formulários**: Adicionar campos faltantes (Telefone, Tipo, Status) no HTML.
4.  **Refatorar Views**: Trocar concatenação de strings por criação segura de elementos DOM.
