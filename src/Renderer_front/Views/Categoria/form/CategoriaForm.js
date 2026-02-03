import CategoriaView from "../CategoriaView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class CategoriaForm {
    constructor() {
        this.view = new CategoriaView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    adicionarEventos() {
        const formulario = document.getElementById('form-categoria-criar');

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const categoria = {
                nome: document.getElementById('nome').value,
                descricao: document.getElementById('descricao').value,
                foto: document.getElementById('foto').value
            };

            const resposta = await window.api.cadastrarCategoria(categoria);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default CategoriaForm;
