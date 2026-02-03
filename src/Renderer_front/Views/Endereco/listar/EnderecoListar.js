import EnderecoView from "../EnderecoView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class EnderecoListar {
    constructor() {
        this.view = new EnderecoView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }

    async renderizarLista() {
        const resposta = await window.api.listarEnderecos();
        console.log('dados endereco lista', resposta);

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
            const idEndereco = e.target.getAttribute("data-id");

            // EDITAR
            if (e.target.classList.contains("editar-endereco")) {
                const resposta = await window.api.buscarEnderecoPorId(idEndereco);
                if (resposta.success && resposta.data) {
                    const endereco = resposta.data;

                    document.getElementById("id").value = endereco.uuid_endereco;
                    document.getElementById("cep_edit").value = endereco.cep_endereco;
                    document.getElementById("logradouro_edit").value = endereco.logradouro_endereco;
                    document.getElementById("numero_edit").value = endereco.numero_endereco;
                    document.getElementById("complemento_edit").value = endereco.complemento_endereco || '';
                    document.getElementById("bairro_edit").value = endereco.bairro_endereco;
                    document.getElementById("cidade_edit").value = endereco.cidade_endereco;
                    document.getElementById("uf_edit").value = endereco.uf_endereco;

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar endereço: " + (resposta.message || "Erro desconhecido"));
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-endereco")) {
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
                    const resposta = await window.api.removerEndereco(idEndereco);
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
        const formEditar = document.getElementById('form-endereco-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const endereco = {
                    uuid: document.getElementById('id').value,
                    cep: document.getElementById('cep_edit').value,
                    logradouro: document.getElementById('logradouro_edit').value,
                    numero: document.getElementById('numero_edit').value,
                    complemento: document.getElementById('complemento_edit').value,
                    bairro: document.getElementById('bairro_edit').value,
                    cidade: document.getElementById('cidade_edit').value,
                    uf: document.getElementById('uf_edit').value
                };

                const resposta = await window.api.editarEndereco(endereco);
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

export default EnderecoListar;
