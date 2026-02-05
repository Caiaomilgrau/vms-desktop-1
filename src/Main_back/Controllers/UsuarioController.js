import Usuarios from '../Models/Usuarios.js';
import SyncService from '../Services/SyncService.js';

class UsuarioController {
    constructor() {
        this.usuarioModel = new Usuarios();
        this.syncService = new SyncService();
    }

    // 1. Listagem
    async listar() {
        try {
            const dadosDoServidor = await this.syncService.sincronizar('usuarios');
            console.log(dadosDoServidor.dados.data);
            dadosDoServidor.dados.data.forEach(async usuario => {
                await this.usuarioModel.salvar(usuario);
                await this.syncService.atualizarSincronizados('usuario', usuario.id_usuario);
            });
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

    

}

export default UsuarioController;