import Endereco from '../Models/Endereco.js';
import Usuarios from '../Models/Usuarios.js';
import SyncService from '../Services/SyncService.js';

class EnderecoController {
    constructor() {
        this.enderecoModel = new Endereco();
        this.usuarioModel = new Usuarios();
        this.syncService = new SyncService();
    }

    // 1. Listagem
    async listar() {
        try {
            const dadosDoServidor = await this.syncService.sincronizar('enderecos');
            console.log(dadosDoServidor.dados.data);
            dadosDoServidor.dados.data.forEach(async endereco => {
                await this.enderecoModel.salvar(endereco);
                await this.syncService.atualizarSincronizados('endereco', endereco.id_endereco);
            });
            const dados = await this.enderecoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar endereços:', error);
            return { success: false, message: 'Falha ao carregar lista de endereços.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const endereco = await this.enderecoModel.buscarPorId(uuid);
            if (!endereco) {
                return { success: false, message: 'Endereço não encontrado.' };
            }
            return { success: true, data: endereco };
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            return { success: false, message: 'Erro interno ao buscar endereço.' };
        }
    }

}

export default EnderecoController;