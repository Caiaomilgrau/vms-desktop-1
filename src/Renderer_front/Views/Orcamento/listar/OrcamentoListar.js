import OrcamentoView from "../OrcamentoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class OrcamentoListar {
    constructor() {
        this.view = new OrcamentoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarOrcamentos();
        console.log('dados orcamento lista', resposta);

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

export default OrcamentoListar;
