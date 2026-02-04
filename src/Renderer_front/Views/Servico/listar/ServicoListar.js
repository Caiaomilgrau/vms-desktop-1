import ServicosView from "../ServicosView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class ServicoListar {
    constructor() {
        this.view = new ServicosView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarServicos();
        console.log('dados servico lista', resposta);

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

export default ServicoListar;
