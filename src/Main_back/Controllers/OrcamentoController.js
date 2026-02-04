import Orcamento from '../Models/Orcamento.js';
import Usuarios from '../Models/Usuarios.js';
import Servicos from '../Models/Servicos.js';
import Pagamento from '../Models/Pagamento.js';

class OrcamentoController {
    constructor() {
        this.orcamentoModel = new Orcamento();
        this.usuarioModel = new Usuarios();
        this.servicoModel = new Servicos();
        this.pagamentoModel = new Pagamento();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.orcamentoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            return { success: false, message: 'Falha ao carregar lista de orçamentos.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const orcamento = await this.orcamentoModel.buscarPorId(uuid);
            if (!orcamento) {
                return { success: false, message: 'Orçamento não encontrado.' };
            }
            return { success: true, data: orcamento };
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            return { success: false, message: 'Erro interno ao buscar orçamento.' };
        }
    }

}

export default OrcamentoController;
