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
        const container = document.getElementById("container");
        if (!container) return;

        container.addEventListener("click", async (e) => {
            const idAgendamento = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-agendamento")) {
                const resposta = await window.api.buscarAgendamentoPorId(idAgendamento);
                if (resposta.success && resposta.data) {
                    const agendamento = resposta.data;

                    document.getElementById("id").value = agendamento.uuid_agendamento;
                    document.getElementById("data_edit").value = agendamento.data_agendamento;
                    document.getElementById("horario_edit").value = agendamento.horario_agendamento;
                    document.getElementById("status_edit").value = agendamento.status_agendamento;

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar agendamento: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-agendamento")) {
                const confirmacao = await Swal.fire({
                    title: 'Tem certeza?',
                    text: "Esta ação não pode ser desfeita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, excluir!',
                    cancelButtonText: 'Cancelar'
                });

                if (confirmacao.isConfirmed) {
                    const resposta = await window.api.removerAgendamento(idAgendamento);
                    if (resposta.success) {
                        this.mensagem.sucesso(resposta.message);
                        setTimeout(async () => {
                            document.getElementById("app").innerHTML = await this.renderizarLista();
                        }, 1000);
                    } else {
                        this.mensagem.erro(resposta.message || "Erro ao excluir!");
                    }
                }
            }

            // FECHAR MODAL
            if (e.target.classList.contains("close")) {
                this.view.fecharModal();
            }
        });

        // SUBMIT FORM EDIT
        const formEditar = document.getElementById('form-agendamento-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const agendamento = {
                    uuid: document.getElementById('id').value,
                    data_agendamento: document.getElementById('data_edit').value,
                    horario_agendamento: document.getElementById('horario_edit').value,
                    status_agendamento: document.getElementById('status_edit').value
                };

                const resposta = await window.api.editarAgendamento(agendamento);
                if (resposta.success) {
                    this.view.fecharModal();
                    this.mensagem.sucesso(resposta.message);
                    setTimeout(async () => {
                        document.getElementById("app").innerHTML = await this.renderizarLista();
                    }, 1000);
                } else {
                    this.mensagem.erro(resposta.message || "Erro ao atualizar!");
                }
            });
        }
    }
}

export default AgendamentoListar;
