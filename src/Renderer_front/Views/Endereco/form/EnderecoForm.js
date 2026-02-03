import EnderecoView from "../EnderecoView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class EnderecoForm {
    constructor() {
        this.view = new EnderecoView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    async adicionarEventos() {
        const formulario = document.getElementById('form-endereco-criar');
        const selectUsuario = document.getElementById('id_usuario');

        // Carregar Usuários
        if (selectUsuario) {
            try {
                const resposta = await window.api.listar();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectUsuario.innerHTML = '<option value="" selected disabled>Selecione um usuário</option>';
                    resposta.data.forEach(usuario => {
                        const option = document.createElement('option');
                        option.value = usuario.uuid_usuario;
                        option.textContent = usuario.nome_usuario;
                        selectUsuario.appendChild(option);
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
        }

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const endereco = {
                id_usuario: document.getElementById('id_usuario').value,
                cep: document.getElementById('cep').value,
                logradouro: document.getElementById('logradouro').value,
                numero: document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value,
                uf: document.getElementById('uf').value
            };

            const resposta = await window.api.cadastrarEndereco(endereco);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default EnderecoForm;
