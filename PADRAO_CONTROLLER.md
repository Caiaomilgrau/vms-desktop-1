# Padrão de Desenvolvimento para Controllers

Este documento define o padrão arquitetural para a criação de Controllers no projeto VMS Desktop. O objetivo é garantir consistência, segurança e facilidade de manutenção.

## 1. Responsabilidades do Controller
O Controller atua como a camada intermediária entre a Interface (View/IPC) e os Dados (Model). Suas responsabilidades são:
1.  **Receber a requisição** do frontend.
2.  **Validar os dados** de entrada (Campos obrigatórios, formatos).
3.  **Mapear os dados** (DeDTO/Frontend -> ParaModel/Banco).
4.  **Chamar o Model** apropriado.
5.  **Tratar Erros** e retornar uma resposta padronizada.

## 2. Padrão de Nomenclatura de Métodos
Devemos usar verbos simples e diretos para as operações CRUD:
*   `listar()`
*   `buscarPorId(uuid)`
*   `cadastrar(dados)`
*   `atualizar(dados)`
*   `remover(uuid)`

Evite sufixos redundantes como `atualizarUsuario`, `removerUsuario` dentro da classe `UsuarioController`.

## 3. Formato de Resposta Padronizado
Todo método do controller deve retornar um objeto com a seguinte estrutura, facilitando a exibição de mensagens no frontend:

```javascript
{
  success: boolean, // true se funcionou, false se deu erro
  message: string,  // Mensagem para o usuário ("Usuário salvo com sucesso" ou erro)
  data: any         // Dados retornados (opcional, null em caso de erro)
}
```

## 4. Exemplo de Implementação (UsuarioController Refatorado)

Abaixo, a sugestão de como o `UsuarioController.js` deve ser implementado seguindo estas boas práticas.

```javascript
import Usuarios from '../Models/Usuarios.js';

class UsuarioController {
    constructor() {
        this.usuarioModel = new Usuarios();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.usuarioModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            return { success: false, message: 'Falha ao carregar lista de usuários.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const usuario = await this.usuarioModel.buscarPorId(uuid);
            if (!usuario) {
                return { success: false, message: 'Usuário não encontrado.' };
            }
            return { success: true, data: usuario };
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            return { success: false, message: 'Erro interno ao buscar usuário.' };
        }
    }

    // 3. Cadastro (Com Validação e Mapeamento)
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Mapeamento (Frontend -> Model)
            // O front envia { nome, email... }, o banco quer { nome_usuario, email_usuario... }
            const usuarioParaSalvar = {
                nome_usuario: dadosFrontend.nome,
                email_usuario: dadosFrontend.email,
                senha_usuario: dadosFrontend.senha,
                telefone_usuario: dadosFrontend.telefone || 'Não informado', // Default
                foto_usuario: dadosFrontend.foto || null,
                tipo_usuario: 'PADRAO', // Ou vindo do front
                status_usuario: 'ATIVO',
                sync_status_usuario: 0
            };

            const id = await this.usuarioModel.adicionar(usuarioParaSalvar);
            return { success: true, message: 'Usuário cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            // Poderia verificar erro.code === 'SQLITE_CONSTRAINT' para e-mail duplicado, etc.
            return { success: false, message: 'Erro ao cadastrar usuário. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
             if (!dadosFrontend.uuid) return { success: false, message: 'ID do usuário necessário para atualização.' };

            // Validação (pode reutilizar ou fazer parcial)
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Verifica existência
            const existe = await this.usuarioModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Usuário não encontrado para edição.' };

            // Mapeamento
            const usuarioAtualizado = {
                uuid: dadosFrontend.uuid,
                nome_usuario: dadosFrontend.nome,
                email_usuario: dadosFrontend.email,
                senha_usuario: dadosFrontend.senha, // Idealmente só atualiza se vier preenchido
                telefone_usuario: dadosFrontend.telefone,
                foto_usuario: dadosFrontend.foto,
                tipo_usuario: dadosFrontend.tipo || existe.tipo_usuario,
                status_usuario: dadosFrontend.status || existe.status_usuario,
                sync_status_usuario: 0
            };

            await this.usuarioModel.atualizar(usuarioAtualizado);
            return { success: true, message: 'Usuário atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar:', error);
            return { success: false, message: 'Erro ao salvar alterações do usuário.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            // O Model espera um objeto com { uuid: ... } no método remover atual
            // Sugestão: Alterar Model para aceitar string direto OU manter objeto
            const usuario = await this.usuarioModel.buscarPorId(uuid);
            if (!usuario) return { success: false, message: 'Usuário não encontrado.' };

            await this.usuarioModel.remover({ uuid }); 
            return { success: true, message: 'Usuário removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover:', error);
            return { success: false, message: 'Falha ao excluir usuário.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!dados.nome) erros.push("Nome é obrigatório");
        if (!dados.email) erros.push("E-mail é obrigatório");
        if (!isUpdate && !dados.senha) erros.push("Senha é obrigatória");
        // Adicionar mais validações de formato...
        return erros;
    }
}

export default UsuarioController;
```

## Resumo das Mudanças
1.  **Padronização de Retorno**: `{ success, message, data }`. O frontend não precisará adivinhar se retornou `false`, `null` ou lançou exception.
2.  **Mapeamento Explícito**: Resolve o problema de propriedades `undefined` no banco por divergência de nomes (`nome` vs `nome_usuario`).
3.  **Try/Catch**: Garante que o app não quebre se o banco falhar.
4.  **Validação Centralizada**: Método `validarDados` limpa o código principal.
