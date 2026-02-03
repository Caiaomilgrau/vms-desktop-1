import Pagamento from '../Models/Pagamento.js';

class PagamentoController {
    constructor() {
        this.pagamentoModel = new Pagamento();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.pagamentoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar pagamentos:', error);
            return { success: false, message: 'Falha ao carregar lista de pagamentos.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const pagamento = await this.pagamentoModel.buscarPorId(uuid);
            if (!pagamento) {
                return { success: false, message: 'Pagamento não encontrado.' };
            }
            return { success: true, data: pagamento };
        } catch (error) {
            console.error('Erro ao buscar pagamento:', error);
            return { success: false, message: 'Erro interno ao buscar pagamento.' };
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
            const pagamentoParaSalvar = {
                tipo_pagamento: dadosFrontend.tipo,
                sync_status_pagamento: 0
            };

            const id = await this.pagamentoModel.adicionar(pagamentoParaSalvar);
            return { success: true, message: 'Pagamento cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar pagamento:', error);
            return { success: false, message: 'Erro ao cadastrar pagamento. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID do pagamento necessário para atualização.' };

            // Verifica existência
            const existe = await this.pagamentoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Pagamento não encontrado para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const pagamentoAtualizado = {
                uuid: dadosFrontend.uuid,
                tipo_pagamento: dadosFrontend.tipo || existe.tipo_pagamento,
                sync_status_pagamento: 0
            };

            await this.pagamentoModel.atualizar(pagamentoAtualizado);
            return { success: true, message: 'Pagamento atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar pagamento:', error);
            return { success: false, message: 'Erro ao salvar alterações do pagamento.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const pagamento = await this.pagamentoModel.buscarPorId(uuid);
            if (!pagamento) return { success: false, message: 'Pagamento não encontrado.' };

            await this.pagamentoModel.remover({ uuid });
            return { success: true, message: 'Pagamento removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover pagamento:', error);
            return { success: false, message: 'Falha ao excluir pagamento.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!dados.tipo) erros.push("Tipo de pagamento é obrigatório");
        return erros;
    }
}

export default PagamentoController;