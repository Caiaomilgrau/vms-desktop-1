import PagamentoView from "../PagamentoView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class PagamentoForm {
    constructor() {
        this.view = new PagamentoView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    adicionarEventos() {
        const formulario = document.getElementById('form-pagamento-criar');

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const pagamento = {
                tipo_pagamento: document.getElementById('tipo').value
            };

            const resposta = await window.api.cadastrarPagamento(pagamento);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default PagamentoForm;
