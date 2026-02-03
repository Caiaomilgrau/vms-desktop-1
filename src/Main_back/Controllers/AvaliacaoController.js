import Avaliacao from '../Models/Avaliacao.js';
import Usuarios from '../Models/Usuarios.js';
import Servicos from '../Models/Servicos.js';

class AvaliacaoController {
    constructor() {
        this.avaliacaoModel = new Avaliacao();
        this.usuarioModel = new Usuarios();
        this.servicoModel = new Servicos();
    }

    // 1. Listagem
    async listar() {
        try {
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

    // 3. Cadastro
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Resolver IDs internos
            const usuario = await this.usuarioModel.buscarPorId(dadosFrontend.id_usuario);
            const servico = await this.servicoModel.buscarPorId(dadosFrontend.id_servico);

            if (!usuario || !servico) {
                return { success: false, message: 'Usuário ou Serviço não encontrado.' };
            }

            // Mapeamento (Frontend -> Model)
            const avaliacaoParaSalvar = {
                id_usuario: usuario.id_usuario,
                id_servico: servico.id_servico,
                nota_avaliacao: dadosFrontend.nota,
                descricao_avaliacao: dadosFrontend.descricao || null,
                status_avaliacao: dadosFrontend.status || 'PUBLICADO',
                foto_avaliacao: dadosFrontend.foto || null,
                sync_status_avaliacao: 0
            };

            const id = await this.avaliacaoModel.adicionar(avaliacaoParaSalvar);
            return { success: true, message: 'Avaliação cadastrada com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar avaliação:', error);
            return { success: false, message: 'Erro ao cadastrar avaliação. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID da avaliação necessário para atualização.' };

            // Verifica existência
            const existe = await this.avaliacaoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Avaliação não encontrada para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const avaliacaoAtualizada = {
                uuid: dadosFrontend.uuid,
                id_usuario: dadosFrontend.id_usuario || existe.id_usuario,
                id_servico: dadosFrontend.id_servico || existe.id_servico,
                nota_avaliacao: dadosFrontend.nota || existe.nota_avaliacao,
                descricao_avaliacao: dadosFrontend.descricao !== undefined ? dadosFrontend.descricao : existe.descricao_avaliacao,
                status_avaliacao: dadosFrontend.status || existe.status_avaliacao,
                foto_avaliacao: dadosFrontend.foto || existe.foto_avaliacao,
                sync_status_avaliacao: 0
            };

            await this.avaliacaoModel.atualizar(avaliacaoAtualizada);
            return { success: true, message: 'Avaliação atualizada com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar avaliação:', error);
            return { success: false, message: 'Erro ao salvar alterações da avaliação.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const avaliacao = await this.avaliacaoModel.buscarPorId(uuid);
            if (!avaliacao) return { success: false, message: 'Avaliação não encontrada.' };

            await this.avaliacaoModel.remover({ uuid });
            return { success: true, message: 'Avaliação removida com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover avaliação:', error);
            return { success: false, message: 'Falha ao excluir avaliação.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!isUpdate && !dados.id_usuario) erros.push("Usuário é obrigatório");
        if (!isUpdate && !dados.id_servico) erros.push("Serviço é obrigatório");
        if (dados.nota === undefined || dados.nota < 1 || dados.nota > 5) erros.push("Nota deve estar entre 1 e 5");
        return erros;
    }
}

export default AvaliacaoController;