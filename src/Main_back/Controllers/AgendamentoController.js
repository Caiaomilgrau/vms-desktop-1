import Agendamento from '../Models/Agendamento.js';
import Usuarios from '../Models/Usuarios.js';
import Servicos from '../Models/Servicos.js';

class AgendamentoController {
    constructor() {
        this.agendamentoModel = new Agendamento();
        this.usuarioModel = new Usuarios();
        this.servicoModel = new Servicos();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.agendamentoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            return { success: false, message: 'Falha ao carregar lista de agendamentos.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const agendamento = await this.agendamentoModel.buscarPorId(uuid);
            if (!agendamento) {
                return { success: false, message: 'Agendamento não encontrado.' };
            }
            return { success: true, data: agendamento };
        } catch (error) {
            console.error('Erro ao buscar agendamento:', error);
            return { success: false, message: 'Erro interno ao buscar agendamento.' };
        }
    }

}

export default AgendamentoController;