class AvaliacaoView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-warning text-dark">
                    <h3 class="card-title mb-0">Menu de Avaliações</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#avaliacao_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Nova Avaliação
                            <span class="badge bg-warning text-dark rounded-pill"><i class="bi bi-star-fill"></i></span>
                        </a>
                        <a href="#avaliacao_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Avaliações
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-chat-left-text"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(avaliacoes) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Avaliações</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nota</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        avaliacoes.forEach(avaliacao => {
            container += `
            <tr>
                <td>${"⭐".repeat(avaliacao.nota_avaliacao)}</td>
                <td>${avaliacao.descricao_avaliacao || '-'}</td>
                <td><span class="badge bg-${this.getBadgeStatus(avaliacao.status_avaliacao)}">${avaliacao.status_avaliacao}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary editar-avaliacao" data-id="${avaliacao.uuid_avaliacao}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-avaliacao" data-id="${avaliacao.uuid_avaliacao}">Excluir</button>
                </td>
            </tr>`;
        });

        container += `
                    </tbody>
                </table>
            </div>
        <!-- Modal -->
        <div id="myModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Avaliação</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-avaliacao-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="nota_edit" class="form-label">Nota (1-5):</label>
                                <input type="number" class="form-control" id="nota_edit" min="1" max="5" required/>
                            </div>

                            <div class="mb-3">
                                <label for="descricao_edit" class="form-label">Comentário:</label>
                                <textarea class="form-control" id="descricao_edit" rows="3"></textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="status_edit" class="form-label">Status:</label>
                                <select class="form-select" id="status_edit">
                                    <option value="PUBLICADO">Publicado</option>
                                    <option value="OCULTO">Oculto</option>
                                    <option value="PENDENTE">Pendente</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="foto_edit" class="form-label">Foto (URL):</label>
                                <input type="text" class="form-control" id="foto_edit"/>
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
        return container;
    }

    renderizarFormulario() {
        return `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="card shadow">
                        <div class="card-header bg-warning text-dark">
                            <h4 class="mb-0">Cadastrar Nova Avaliação</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-avaliacao-criar">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuário:</label>
                                    <select class="form-select" id="id_usuario" required>
                                        <option value="" selected disabled>Carregando usuários...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="id_servico" class="form-label">Serviço:</label>
                                    <select class="form-select" id="id_servico" required>
                                        <option value="" selected disabled>Carregando serviços...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="nota" class="form-label">Nota (1 a 5):</label>
                                    <input type="number" class="form-control" id="nota" min="1" max="5" required/>
                                </div>

                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Comentário:</label>
                                    <textarea class="form-control" id="descricao" rows="3"></textarea>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto (URL):</label>
                                    <input type="text" class="form-control" id="foto"/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-warning">Enviar Avaliação</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getBadgeStatus(status) {
        switch (status) {
            case 'PUBLICADO': return 'success';
            case 'PENDENTE': return 'warning';
            case 'OCULTO': return 'secondary';
            default: return 'info';
        }
    }

    abrirModal() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "block";
            modal.style.backgroundColor = "rgba(0,0,0,0.5)";
            modal.classList.add("show");
        }
    }

    fecharModal() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
            modal.style.backgroundColor = "";
            modal.classList.remove("show");
        }
    }
}

export default AvaliacaoView;
