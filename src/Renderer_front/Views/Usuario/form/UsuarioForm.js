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
            console.log(event)
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const senha = document.getElementById('senha');
            const usuario = {
                nome: nome.value,
                email: email.value,
                senha: senha.value
            }

            const resultado = await window.api.cadastrar(usuario);

            if (resultado) {
                nome.value = '';
                email.value = '';
                senha.value = '';
                this.mensagem.sucesso();
            } else {
                this.mensagem.erro();
            }
        })
    }
}

export default UsuarioForm;