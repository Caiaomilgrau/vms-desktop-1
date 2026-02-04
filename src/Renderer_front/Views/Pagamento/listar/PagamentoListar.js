import PagamentoView from "../PagamentoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class PagamentoListar {
    constructor() {
        this.view = new PagamentoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarPagamentos();
        console.log('dados pagamento lista', resposta);

        let dadosParaExibir = [];
        if (resposta.success) {
            dadosParaExibir = resposta.data;
        } else {
            console.error(resposta.message);
        }

        setTimeout(() => {
            this.adicionarEventos();
        }, 0)
        return this.view.renderizarLista(dadosParaExibir)
    }

    adicionarEventos() {
        // No events needed for read-only list
    }
}

export default PagamentoListar;
