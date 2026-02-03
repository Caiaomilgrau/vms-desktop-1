import Orcamento from '../Models/Orcamento.js';
import Usuarios from '../Models/Usuarios.js';
import Servicos from '../Models/Servicos.js';
import Pagamento from '../Models/Pagamento.js';

class OrcamentoController {
    constructor() {
        this.orcamentoModel = new Orcamento();
        this.usuarioModel = new Usuarios();
        this.servicoModel = new Servicos();
        this.pagamentoModel = new Pagamento();
    }

    // 1. Listagem
    async listar() {
        try {
            const dados = await this.orcamentoModel.listar();
            return { success: true, data: dados };
        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            return { success: false, message: 'Falha ao carregar lista de orçamentos.' };
        }
    }

    // 2. Busca por ID
    async buscarPorId(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID não fornecido.' };

            const orcamento = await this.orcamentoModel.buscarPorId(uuid);
            if (!orcamento) {
                return { success: false, message: 'Orçamento não encontrado.' };
            }
            return { success: true, data: orcamento };
        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            return { success: false, message: 'Erro interno ao buscar orçamento.' };
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
            const pagamento = await this.pagamentoModel.buscarPorId(dadosFrontend.id_pagamento);

            if (!usuario || !servico || !pagamento) {
                return { success: false, message: 'Usuário, Serviço ou Forma de Pagamento não encontrado.' };
            }

            // Mapeamento (Frontend -> Model)
            const orcamentoParaSalvar = {
                id_usuario: usuario.id_usuario,
                id_servico: servico.id_servico,
                id_pagamento: pagamento.id_pagamento,
                valor_orcamento: dadosFrontend.valor,
                status_orcamento: dadosFrontend.status || 'PENDENTE',
                data_orcamento: dadosFrontend.data,
                sync_status_orcamento: 0
            };

            const id = await this.orcamentoModel.adicionar(orcamentoParaSalvar);
            return { success: true, message: 'Orçamento cadastrado com sucesso!', data: { id } };

        } catch (error) {
            console.error('Erro ao cadastrar orçamento:', error);
            return { success: false, message: 'Erro ao cadastrar orçamento. Verifique os dados.' };
        }
    }

    // 4. Atualização
    async atualizar(dadosFrontend) {
        try {
            if (!dadosFrontend.uuid) return { success: false, message: 'ID do orçamento necessário para atualização.' };

            // Verifica existência
            const existe = await this.orcamentoModel.buscarPorId(dadosFrontend.uuid);
            if (!existe) return { success: false, message: 'Orçamento não encontrado para edição.' };

            // Validação
            const erros = this.validarDados(dadosFrontend, true);
            if (erros.length > 0) return { success: false, message: erros.join(', ') };

            // Mapeamento
            const orcamentoAtualizado = {
                uuid: dadosFrontend.uuid,
                id_usuario: dadosFrontend.id_usuario || existe.id_usuario,
                id_servico: dadosFrontend.id_servico || existe.id_servico,
                id_pagamento: dadosFrontend.id_pagamento || existe.id_pagamento,
                valor_orcamento: dadosFrontend.valor || existe.valor_orcamento,
                status_orcamento: dadosFrontend.status || existe.status_orcamento,
                data_orcamento: dadosFrontend.data || existe.data_orcamento,
                sync_status_orcamento: 0
            };

            await this.orcamentoModel.atualizar(orcamentoAtualizado);
            return { success: true, message: 'Orçamento atualizado com sucesso!' };

        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            return { success: false, message: 'Erro ao salvar alterações do orçamento.' };
        }
    }

    // 5. Remoção
    async remover(uuid) {
        try {
            if (!uuid) return { success: false, message: 'ID inválido.' };

            const orcamento = await this.orcamentoModel.buscarPorId(uuid);
            if (!orcamento) return { success: false, message: 'Orçamento não encontrado.' };

            await this.orcamentoModel.remover({ uuid });
            return { success: true, message: 'Orçamento removido com sucesso.' };
        } catch (error) {
            console.error('Erro ao remover orçamento:', error);
            return { success: false, message: 'Falha ao excluir orçamento.' };
        }
    }

    // Método Auxiliar de Validação
    validarDados(dados, isUpdate = false) {
        const erros = [];
        if (!isUpdate && !dados.id_usuario) erros.push("Usuário é obrigatório");
        if (!isUpdate && !dados.id_servico) erros.push("Serviço é obrigatório");
        if (!isUpdate && !dados.id_pagamento) erros.push("Forma de pagamento é obrigatória");
        if (dados.valor === undefined || dados.valor <= 0) erros.push("Valor deve ser maior que zero");
        if (!dados.data) erros.push("Data é obrigatória");
        return erros;
    }
}

export default OrcamentoController;
