import UsuariosView from "../UsuariosView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"
class UsuarioListar {
    constructor() {
        this.view = new UsuariosView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }
    async renderizarLista() {
        const resposta = await window.api.listar();
        console.log('dados na usuario lista', resposta);

        let dadosParaExibir = [];
        if (resposta.success) {
            dadosParaExibir = resposta.data;
        } else {
            console.error(resposta.message);
            // Poderia mostrar erro na tela aqui
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
export default UsuarioListar;