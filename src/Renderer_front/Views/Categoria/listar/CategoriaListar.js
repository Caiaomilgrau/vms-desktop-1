import CategoriaView from "../CategoriaView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class CategoriaListar {
    constructor() {
        this.view = new CategoriaView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarCategorias();
        console.log('dados categoria lista', resposta);

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

export default CategoriaListar;
