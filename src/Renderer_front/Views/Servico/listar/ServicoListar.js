import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"

class ServicoListar {
    constructor() {
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
        return this.renderizarView(dadosParaExibir);
    }

    renderizarView(servicos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Serviços</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Data Conclusão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        servicos.forEach(servico => {
            container += `
            <tr>
                <td>${servico.descricao_servico}</td>
                <td><span class="badge ${servico.status_servico === 'CONCLUIDO' ? 'bg-success' : 'bg-warning'}">${servico.status_servico}</span></td>
                <td>${servico.data_conclusao || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary editar-servico" data-id="${servico.uuid_servico}">Editar</button>
                    <button class="btn btn-sm btn-danger exclusion-servico excluir-servico" data-id="${servico.uuid_servico}">Excluir</button>
                </td>
            </tr>`;
        });

        container += `
                    </tbody>
                </table>
            </div>

            <!-- Modal -->
            <div id="modalServico" class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editar Serviço</h5>
                            <button type="button" class="btn-close close" id="fecharModal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="form-servico-editar">
                                <input type="text" id="id_servico" hidden/>
                                
                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descrição:</label>
                                    <input type="text" class="form-control" id="descricao"/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status:</label>
                                    <select class="form-select" id="status">
                                        <option value="ABERTO">Aberto</option>
                                        <option value="EM_ANDAMENTO">Em Andamento</option>
                                        <option value="CONCLUIDO">Concluído</option>
                                        <option value="CANCELADO">Cancelado</option>
                                    </select>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="data_conclusao" class="form-label">Data Conclusão:</label>
                                    <input type="date" class="form-control" id="data_conclusao"/>
                                </div>

                                <div class="mb-3">
                                    <label for="telefone" class="form-label">Telefone Usuário:</label>
                                    <input type="text" class="form-control" id="telefone"/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto URL:</label>
                                    <input type="text" class="form-control" id="foto"/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        return container;
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
                    document.getElementById("id_servico").value = servico.uuid_servico;
                    document.getElementById("descricao").value = servico.descricao_servico;
                    document.getElementById("status").value = servico.status_servico;
                    document.getElementById("data_conclusao").value = servico.data_conclusao;
                    document.getElementById("telefone").value = servico.telefone_usuario || '';
                    document.getElementById("foto").value = servico.foto_servico || '';

                    this.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar serviço: " + resposta.message);
                }
            }

            // EXCLUIR
            if (e.target.classList.contains("excluir-servico")) {
                if (confirm("Tem certeza que deseja excluir este serviço?")) {
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
                this.fecharModal();
            }
        });

        // SUBMIT FORM EDIT
        const formEditar = document.getElementById('form-servico-editar');
        if (formEditar) {
            formEditar.addEventListener('submit', async (event) => {
                event.preventDefault();

                const servico = {
                    uuid: document.getElementById('id_servico').value,
                    descricao_servico: document.getElementById('descricao').value,
                    status_servico: document.getElementById('status').value,
                    data_conclusao: document.getElementById('data_conclusao').value,
                    telefone_usuario: document.getElementById('telefone').value,
                    foto_servico: document.getElementById('foto').value
                };

                const resposta = await window.api.editarServico(servico);
                if (resposta.success) {
                    this.fecharModal();
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

    abrirModal() {
        const modal = document.getElementById("modalServico");
        if (modal) {
            modal.style.display = "block";
            modal.style.backgroundColor = "rgba(0,0,0,0.5)";
            modal.classList.add("show");
        }
    }

    fecharModal() {
        const modal = document.getElementById("modalServico");
        if (modal) {
            modal.style.display = "none";
            modal.style.backgroundColor = "";
            modal.classList.remove("show");
        }
    }
}

export default ServicoListar;
