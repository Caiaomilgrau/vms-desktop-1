import AvaliacaoView from "../AvaliacaoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class AvaliacaoListar {
    constructor() {
        this.view = new AvaliacaoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarAvaliacoes();
        console.log('dados avaliacao lista', resposta);

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
            const idAvaliacao = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-avaliacao")) {
                const resposta = await window.api.buscarAvaliacaoPorId(idAvaliacao);
                if (resposta.success && resposta.data) {
                    const avaliacao = resposta.data;

                    document.getElementById("id").value = avaliacao.uuid_avaliacao;
                    document.getElementById("nota_edit").value = avaliacao.nota_avaliacao;
                    document.getElementById("descricao_edit").value = avaliacao.descricao_avaliacao || '';
                    document.getElementById("status_edit").value = avaliacao.status_avaliacao;
                    document.getElementById("foto_edit").value = avaliacao.foto_avaliacao || '';

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar avaliação: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-avaliacao")) {
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
                    const resposta = await window.api.removerAvaliacao(idAvaliacao);
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
        const formEditar = document.getElementById('form-avaliacao-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const avaliacao = {
                    uuid: document.getElementById('id').value,
                    nota_avaliacao: document.getElementById('nota_edit').value,
                    descricao_avaliacao: document.getElementById('descricao_edit').value,
                    status_avaliacao: document.getElementById('status_edit').value,
                    foto_avaliacao: document.getElementById('foto_edit').value
                };

                const resposta = await window.api.editarAvaliacao(avaliacao);
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

export default AvaliacaoListar;
