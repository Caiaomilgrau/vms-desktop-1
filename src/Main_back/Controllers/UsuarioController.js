import Usuarios from '../Models/Usuarios.js';

class UsuarioController {
    constructor() {
        this.usuarioModel = new Usuarios();
    }

    // 1. Listagem
    async listar() {
        try {
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