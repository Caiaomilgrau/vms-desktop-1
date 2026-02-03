import OrcamentoView from "../OrcamentoView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class OrcamentoForm {
    constructor() {
        this.view = new OrcamentoView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    async adicionarEventos() {
        const formulario = document.getElementById('form-orcamento-criar');
        const selectUsuario = document.getElementById('id_usuario');
        const selectServico = document.getElementById('id_servico');
        const selectPagamento = document.getElementById('id_pagamento');

        // Carregar Usuários
        if (selectUsuario) {
            try {
                const resposta = await window.api.listar();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectUsuario.innerHTML = '<option value="" selected disabled>Selecione um usuário</option>';
                    resposta.data.forEach(usuario => {
                        const option = document.createElement('option');
                        option.value = usuario.uuid_usuario;
                        option.textContent = usuario.nome_usuario;
                        selectUsuario.appendChild(option);
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }

        // Carregar Serviços
        if (selectServico) {
            try {
                const resposta = await window.api.listarServicos();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectServico.innerHTML = '<option value="" selected disabled>Selecione um serviço</option>';
                    resposta.data.forEach(servico => {
                        const option = document.createElement('option');
                        option.value = servico.uuid_servico;
                        option.textContent = servico.descricao_servico;
                        selectServico.appendChild(option);
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar serviços:", error);
            }
        }

        // Carregar Pagamentos
        if (selectPagamento) {
            try {
                const resposta = await window.api.listarPagamentos();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectPagamento.innerHTML = '<option value="" selected disabled>Selecione uma forma de pagamento</option>';
                    resposta.data.forEach(pagamento => {
                        const option = document.createElement('option');
                        option.value = pagamento.uuid_pagamento;
                        option.textContent = pagamento.tipo_pagamento;
                        selectPagamento.appendChild(option);
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar pagamentos:", error);
            }
        }

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const orcamento = {
                id_usuario: document.getElementById('id_usuario').value,
                id_servico: document.getElementById('id_servico').value,
                id_pagamento: document.getElementById('id_pagamento').value,
                valor_orcamento: document.getElementById('valor').value,
                data_orcamento: document.getElementById('data').value
            };

            const resposta = await window.api.cadastrarOrcamento(orcamento);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default OrcamentoForm;
