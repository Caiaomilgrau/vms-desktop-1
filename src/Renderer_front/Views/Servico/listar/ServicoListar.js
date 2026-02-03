import ServicosView from "../ServicosView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class ServicoListar {
    constructor() {
        this.view = new ServicosView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarServicos();
        console.log('dados servico lista', resposta);

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
            const idServico = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-servico")) {
                const resposta = await window.api.buscarServicoPorId(idServico);
                if (resposta.success && resposta.data) {
                    const servico = resposta.data;

                    // Preencher modal (usando IDs do ServicosView.js)
                    const idInput = document.getElementById("id");
                    const descInput = document.getElementById("descricao_edit");
                    const statusInput = document.getElementById("status_edit");
                    const dataInput = document.getElementById("data_conclusao_edit");
                    const fotoInput = document.getElementById("foto_edit");

                    if (idInput) idInput.value = servico.uuid_servico;
                    if (descInput) descInput.value = servico.descricao_servico;
                    if (statusInput) statusInput.value = servico.status_servico;
                    if (dataInput) dataInput.value = servico.data_conclusao || '';
                    if (fotoInput) fotoInput.value = servico.foto_servico || '';

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar serviço: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-servico")) {
                const confirmacao = await Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você não poderá reverter isso!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, excluir!',
                    cancelButtonText: 'Cancelar'
                });

                if (confirmacao.isConfirmed) {
                    const resposta = await window.api.removerServico(idServico);
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
        const formEditar = document.getElementById('form-servico-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const servico = {
                    uuid: document.getElementById('id').value,
                    descricao_servico: document.getElementById('descricao_edit').value,
                    status_servico: document.getElementById('status_edit').value,
                    data_conclusao: document.getElementById('data_conclusao_edit').value,
                    foto_servico: document.getElementById('foto_edit').value
                };

                const resposta = await window.api.editarServico(servico);
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

export default ServicoListar;
