import Servicos from '../Models/Servicos.js';
import Usuarios from '../Models/Usuarios.js';

class ServicoController {
    constructor() {
        this.servicoModel = new Servicos();
        this.usuarioModel = new Usuarios();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.servicoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar serviços:', error);
            return { success: false, message: 'Falha ao carregar lista de serviços.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const servico = await this.servicoModel.buscarPorId(uuid);
            if (!servico) {
                return { success: false, message: 'Serviço não encontrado.' };
            }
            return { success: true, data: servico };
        } catch (error) {
            console.error('Erro ao buscar serviço:', error);
            return { success: false, message: 'Erro interno ao buscar serviço.' };
        }
    }

}

export default ServicoController;