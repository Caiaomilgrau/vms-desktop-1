import Servicos from '../Models/Servicos.js';
import SyncService from '../Services/SyncService.js';

class ServicoController {
    constructor() {
        this.servicoModel = new Servicos();
        this.syncService = new SyncService();
    }

    // 1. Listagem
    async listar() {
        try {
            const dadosDoServidor = await this.syncService.sincronizar('servicos');
            console.log(dadosDoServidor.dados.data);
            dadosDoServidor.dados.data.forEach(async servico => {
                await this.servicoModel.salvar(servico);
                await this.syncService.atualizarSincronizados('servico', servico.id_servico);
            });
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