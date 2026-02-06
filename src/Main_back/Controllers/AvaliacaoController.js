import Avaliacao from '../Models/Avaliacao.js';
import Usuarios from '../Models/Usuarios.js';
import Servicos from '../Models/Servicos.js';
import SyncService from '../Services/SyncService.js';

class AvaliacaoController {
    constructor() {
        this.avaliacaoModel = new Avaliacao();
        this.usuarioModel = new Usuarios();
        this.servicoModel = new Servicos();
        this.syncService = new SyncService();
    }

    // 1. Listagem
    async listar() {
        try {
            const dadosDoServidor = await this.syncService.sincronizar('avaliacoes');
            console.log(dadosDoServidor.dados.data);
            dadosDoServidor.dados.data.forEach(async avaliacao => {
                await this.avaliacaoModel.salvar(avaliacao);
                await this.syncService.atualizarSincronizados('avaliacao', avaliacao.id_avaliacao);
            });
            const dados = await this.avaliacaoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar avaliações:', error);
            return { success: false, message: 'Falha ao carregar lista de avaliações.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const avaliacao = await this.avaliacaoModel.buscarPorId(uuid);
            if (!avaliacao) {
                return { success: false, message: 'Avaliação não encontrada.' };
            }
            return { success: true, data: avaliacao };
        } catch (error) {
            console.error('Erro ao buscar avaliação:', error);
            return { success: false, message: 'Erro interno ao buscar avaliação.' };
        }
    }

}

export default AvaliacaoController;