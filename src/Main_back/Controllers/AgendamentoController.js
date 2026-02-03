import Agendamento from '../Models/Agendamento.js';

class AgendamentoController {
    constructor() {
        this.agendamentoModel = new Agendamento();
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

    // 3. Cadastro
    async cadastrar(dadosFrontend) {
        try {
            // Validação
            const erros = this.validarDados(dadosFrontend);
            if (erros.length > 0) {
                return { success: false, message: erros.join(', ') };
            }

            // Mapeamento (Frontend -> Model)
            const agendamentoParaSalvar = {
                id_usuario: dadosFrontend.id_usuario,
                id_servico: dadosFrontend.id_servico,
                horario_agendamento: dadosFrontend.horario,
                status_agendamento: dadosFrontend.status || 'AGENDADO',
                data_agendamento: dadosFrontend.data,
                sync_status_agendamento: 0
            };

            const id = await this.agendamentoModel.adicionar(agendamentoParaSalvar);
            return { success: true, message: 'Agendamento cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar agendamento:', error);
            return { success: false, message: 'Erro ao cadastrar agendamento. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID do agendamento necessário para atualização.' };

            // Verifica existência
            const existe = await this.agendamentoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Agendamento não encontrado para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const agendamentoAtualizado = {
                uuid: dadosFrontend.uuid,
                id_usuario: dadosFrontend.id_usuario || existe.id_usuario,
                id_servico: dadosFrontend.id_servico || existe.id_servico,
                horario_agendamento: dadosFrontend.horario || existe.horario_agendamento,
                status_agendamento: dadosFrontend.status || existe.status_agendamento,
                data_agendamento: dadosFrontend.data || existe.data_agendamento,
                sync_status_agendamento: 0
            };

            await this.agendamentoModel.atualizar(agendamentoAtualizado);
            return { success: true, message: 'Agendamento atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar agendamento:', error);
            return { success: false, message: 'Erro ao salvar alterações do agendamento.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const agendamento = await this.agendamentoModel.buscarPorId(uuid);
            if (!agendamento) return { success: false, message: 'Agendamento não encontrado.' };

            await this.agendamentoModel.remover({ uuid });
            return { success: true, message: 'Agendamento removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover agendamento:', error);
            return { success: false, message: 'Falha ao excluir agendamento.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!isUpdate && !dados.id_usuario) erros.push("Usuário é obrigatório");
        if (!isUpdate && !dados.id_servico) erros.push("Serviço é obrigatório");
        if (!dados.horario) erros.push("Horário é obrigatório");
        if (!dados.data) erros.push("Data é obrigatória");
        return erros;
    }
}

export default AgendamentoController;