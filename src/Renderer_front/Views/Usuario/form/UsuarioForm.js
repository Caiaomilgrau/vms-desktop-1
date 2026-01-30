import UsuariosView from "../UsuariosView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class UsuarioForm {
    constructor() {
        this.view = new UsuariosView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
            console.log('Eventos adicionados');
        }, 0);

        return this.view.renderizarFormulario();
    }

    adicionarEventos() {
        const formulario = document.getElementById('form-usuario');

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const foto = document.getElementById('foto');
            const tipo = document.getElementById('tipo');
            const status = document.getElementById('status');
            const senha = document.getElementById('senha');
            const usuario = {
                nome: nome.value,
                email: email.value,
                telefone: telefone.value,
                foto: foto.value,
                tipo: tipo.value,
                status: status.value,
                senha: senha.value
            }

            const resposta = await window.api.cadastrar(usuario);

            if (resposta.success) {
                nome.value = '';
                email.value = '';
                telefone.value = '';
                foto.value = '';
                // tipo and status default to first option usually, or reset.
                senha.value = '';
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        })
    }
}

export default UsuarioForm;