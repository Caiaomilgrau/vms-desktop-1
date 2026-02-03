import Servicos from '../Models/Servicos.js';

class ServicoController {
    constructor() {
        this.servicoModel = new Servicos();
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

    // 3. Cadastro
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Mapeamento (Frontend -> Model)
            const servicoParaSalvar = {
                id_usuario: dadosFrontend.id_usuario,
                descricao_servico: dadosFrontend.descricao,
                status_servico: dadosFrontend.status || 'PENDENTE',
                data_conclusao: dadosFrontend.data_conclusao || null,
                foto_servico: dadosFrontend.foto || null,
                sync_status_servico: 0
            };

            const id = await this.servicoModel.adicionar(servicoParaSalvar);
            return { success: true, message: 'Serviço cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            return { success: false, message: 'Erro ao cadastrar serviço.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID do serviço necessário para atualização.' };

            // Verifica existência
            const existe = await this.servicoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Serviço não encontrado para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento - Mantém dados antigos se não vierem novos (opcional, mas seguro)
            const servicoAtualizado = {
                uuid: dadosFrontend.uuid,
                descricao_servico: dadosFrontend.descricao || existe.descricao_servico,
                status_servico: dadosFrontend.status || existe.status_servico,
                data_conclusao: dadosFrontend.data_conclusao || existe.data_conclusao,
                foto_servico: dadosFrontend.foto || existe.foto_servico,
                sync_status_servico: 0
            };

            await this.servicoModel.atualizar(servicoAtualizado);
            return { success: true, message: 'Serviço atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            return { success: false, message: 'Erro ao salvar alterações do serviço.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const servico = await this.servicoModel.buscarPorId(uuid);
            if (!servico) return { success: false, message: 'Serviço não encontrado.' };

            await this.servicoModel.remover({ uuid: uuid });
            return { success: true, message: 'Serviço removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover serviço:', error);
            return { success: false, message: 'Falha ao excluir serviço.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!isUpdate && !dados.id_usuario) erros.push("Usuário é obrigatório");
        if (!dados.descricao) erros.push("Descrição é obrigatória");

        return erros;
    }
}

export default ServicoController;