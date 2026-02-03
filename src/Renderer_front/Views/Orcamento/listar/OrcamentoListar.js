import OrcamentoView from "../OrcamentoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class OrcamentoListar {
    constructor() {
        this.view = new OrcamentoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarOrcamentos();
        console.log('dados orcamento lista', resposta);

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
            const idOrcamento = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-orcamento")) {
                const resposta = await window.api.buscarOrcamentoPorId(idOrcamento);
                if (resposta.success && resposta.data) {
                    const orcamento = resposta.data;

                    document.getElementById("id").value = orcamento.uuid_orcamento;
                    document.getElementById("valor_edit").value = orcamento.valor_orcamento;
                    document.getElementById("data_edit").value = orcamento.data_orcamento;
                    document.getElementById("status_edit").value = orcamento.status_orcamento;

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar orçamento: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-orcamento")) {
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
                    const resposta = await window.api.removerOrcamento(idOrcamento);
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
        const formEditar = document.getElementById('form-orcamento-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const orcamento = {
                    uuid: document.getElementById('id').value,
                    valor_orcamento: document.getElementById('valor_edit').value,
                    data_orcamento: document.getElementById('data_edit').value,
                    status_orcamento: document.getElementById('status_edit').value
                };

                const resposta = await window.api.editarOrcamento(orcamento);
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

export default OrcamentoListar;
