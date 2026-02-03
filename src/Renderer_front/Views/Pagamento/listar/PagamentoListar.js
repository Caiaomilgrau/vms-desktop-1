import PagamentoView from "../PagamentoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class PagamentoListar {
    constructor() {
        this.view = new PagamentoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarPagamentos();
        console.log('dados pagamento lista', resposta);

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
            const idPagamento = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-pagamento")) {
                const resposta = await window.api.buscarPagamentoPorId(idPagamento);
                if (resposta.success && resposta.data) {
                    const pagamento = resposta.data;

                    document.getElementById("id").value = pagamento.uuid_pagamento;
                    document.getElementById("tipo_edit").value = pagamento.tipo_pagamento;

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar forma de pagamento: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-pagamento")) {
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
                    const resposta = await window.api.removerPagamento(idPagamento);
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
        const formEditar = document.getElementById('form-pagamento-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const pagamento = {
                    uuid: document.getElementById('id').value,
                    tipo_pagamento: document.getElementById('tipo_edit').value
                };

                const resposta = await window.api.editarPagamento(pagamento);
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

export default PagamentoListar;
