    import Categoria from '../Models/Categoria.js';
import SyncService from '../Services/SyncService.js';

class CategoriaController {
    constructor() {
        this.categoriaModel = new Categoria();
        this.syncService = new SyncService();
    }

    // 1. Listagem
    async listar() {
        try {
            const dadosDoServidor = await this.syncService.sincronizar('categorias');
            console.log(dadosDoServidor.dados.data);
            dadosDoServidor.dados.data.forEach(async categoria => {
                await this.categoriaModel.salvar(categoria);
                await this.syncService.atualizarSincronizados('categoria', categoria.id_categoria);
            });
            const dados = await this.categoriaModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar categorias:', error);
            return { success: false, message: 'Falha ao carregar lista de categorias.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const categoria = await this.categoriaModel.buscarPorId(uuid);
            if (!categoria) {
                return { success: false, message: 'Categoria não encontrada.' };
            }
            return { success: true, data: categoria };
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            return { success: false, message: 'Erro interno ao buscar categoria.' };
        }
    }

}

export default CategoriaController;