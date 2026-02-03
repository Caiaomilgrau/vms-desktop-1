import AgendamentoView from "../AgendamentoView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class AgendamentoForm {
    constructor() {
        this.view = new AgendamentoView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return this.view.renderizarFormulario();
    }

    async adicionarEventos() {
        const formulario = document.getElementById('form-agendamento-criar');
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

            const agendamento = {
                id_usuario: document.getElementById('id_usuario').value,
                id_servico: document.getElementById('id_servico').value,
                data_agendamento: document.getElementById('data').value,
                horario_agendamento: document.getElementById('horario').value,
                status_agendamento: document.getElementById('status').value
            };

            const resposta = await window.api.cadastrarAgendamento(agendamento);

            if (resposta.success) {
                formulario.reset();
                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        });
    }
}

export default AgendamentoForm;
