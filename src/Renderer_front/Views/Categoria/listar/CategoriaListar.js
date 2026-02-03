import CategoriaView from "../CategoriaView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class CategoriaListar {
    constructor() {
        this.view = new CategoriaView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarCategorias();
        console.log('dados categoria lista', resposta);

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
            const idCategoria = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-categoria")) {
                const resposta = await window.api.buscarCategoriaPorId(idCategoria);
                if (resposta.success && resposta.data) {
                    const categoria = resposta.data;

                    document.getElementById("id").value = categoria.uuid_categoria;
                    document.getElementById("nome_edit").value = categoria.nome_categoria;
                    document.getElementById("descricao_edit").value = categoria.descricao_categoria || '';
                    document.getElementById("foto_edit").value = categoria.foto_categoria || '';

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar categoria: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-categoria")) {
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
                    const resposta = await window.api.removerCategoria(idCategoria);
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
        const formEditar = document.getElementById('form-categoria-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const categoria = {
                    uuid: document.getElementById('id').value,
                    nome: document.getElementById('nome_edit').value,
                    descricao: document.getElementById('descricao_edit').value,
                    foto: document.getElementById('foto_edit').value
                };

                const resposta = await window.api.editarCategoria(categoria);
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

export default CategoriaListar;
