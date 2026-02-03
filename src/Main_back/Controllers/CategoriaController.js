import Categoria from '../Models/Categoria.js';

class CategoriaController {
    constructor() {
        this.categoriaModel = new Categoria();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.categoriaModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar categorias:', error);
            return { success: false, message: 'Falha ao carregar lista de categorias.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const categoria = await this.categoriaModel.buscarPorId(uuid);
            if (!categoria) {
                return { success: false, message: 'Categoria não encontrada.' };
            }
            return { success: true, data: categoria };
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            return { success: false, message: 'Erro interno ao buscar categoria.' };
        }
    }

    // 3. Cadastro
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Mapeamento (Frontend -> Model)
            const categoriaParaSalvar = {
                nome_categoria: dadosFrontend.nome,
                descricao_categoria: dadosFrontend.descricao || null,
                foto_categoria: dadosFrontend.foto || null,
                sync_status_categoria: 0
            };

            const id = await this.categoriaModel.adicionar(categoriaParaSalvar);
            return { success: true, message: 'Categoria cadastrada com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar categoria:', error);
            return { success: false, message: 'Erro ao cadastrar categoria. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID da categoria necessário para atualização.' };

            // Verifica existência
            const existe = await this.categoriaModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Categoria não encontrada para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const categoriaAtualizada = {
                uuid: dadosFrontend.uuid,
                nome_categoria: dadosFrontend.nome || existe.nome_categoria,
                descricao_categoria: dadosFrontend.descricao !== undefined ? dadosFrontend.descricao : existe.descricao_categoria,
                foto_categoria: dadosFrontend.foto || existe.foto_categoria,
                sync_status_categoria: 0
            };

            await this.categoriaModel.atualizar(categoriaAtualizada);
            return { success: true, message: 'Categoria atualizada com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            return { success: false, message: 'Erro ao salvar alterações da categoria.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const categoria = await this.categoriaModel.buscarPorId(uuid);
            if (!categoria) return { success: false, message: 'Categoria não encontrada.' };

            await this.categoriaModel.remover({ uuid });
            return { success: true, message: 'Categoria removida com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover categoria:', error);
            return { success: false, message: 'Falha ao excluir categoria.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!dados.nome) erros.push("Nome da categoria é obrigatório");
        return erros;
    }
}

export default CategoriaController;