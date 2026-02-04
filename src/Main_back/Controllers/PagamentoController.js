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

}

export default PagamentoController;