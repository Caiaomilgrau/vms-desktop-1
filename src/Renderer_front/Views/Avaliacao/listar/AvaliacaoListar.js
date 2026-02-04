import AvaliacaoView from "../AvaliacaoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class AvaliacaoListar {
    constructor() {
        this.view = new AvaliacaoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarAvaliacoes();
        console.log('dados avaliacao lista', resposta);

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

export default AvaliacaoListar;
