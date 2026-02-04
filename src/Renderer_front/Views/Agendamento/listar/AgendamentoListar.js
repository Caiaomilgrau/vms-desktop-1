import AgendamentoView from "../AgendamentoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class AgendamentoListar {
    constructor() {
        this.view = new AgendamentoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarAgendamentos();
        console.log('dados agendamento lista', resposta);

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

export default AgendamentoListar;
