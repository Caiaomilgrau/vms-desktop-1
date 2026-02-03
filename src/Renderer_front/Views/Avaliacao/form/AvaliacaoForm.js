import AvaliacaoView from "../AvaliacaoView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class AvaliacaoForm {
    constructor() {
        this.view = new AvaliacaoView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    async adicionarEventos() {
        const formulario = document.getElementById('form-avaliacao-criar');
        const selectUsuario = document.getElementById('id_usuario');
        const selectServico = document.getElementById('id_servico');

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

        // Carregar Serviços
        if (selectServico) {
            try {
                const resposta = await window.api.listarServicos();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectServico.innerHTML = '<option value="" selected disabled>Selecione um serviço</option>';
                    resposta.data.forEach(servico => {
                        const option = document.createElement('option');
                        option.value = servico.uuid_servico;
                        option.textContent = servico.descricao_servico;
                        selectServico.appendChild(option);
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar serviços:", error);
            }
        }

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const avaliacao = {
                id_usuario: document.getElementById('id_usuario').value,
                id_servico: document.getElementById('id_servico').value,
                nota_avaliacao: document.getElementById('nota').value,
                descricao_avaliacao: document.getElementById('descricao').value,
                foto_avaliacao: document.getElementById('foto').value
            };

            const resposta = await window.api.cadastrarAvaliacao(avaliacao);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default AvaliacaoForm;
