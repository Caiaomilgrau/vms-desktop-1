class ServicosView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-success text-white">
                    <h3 class="card-title mb-0">Menu de Serviços</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#servico_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Cadastrar Serviço
                            <span class="badge bg-success rounded-pill"><i class="bi bi-plus"></i></span>
                        </a>
                        <a href="#servico_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Serviços
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-list"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(servicos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Serviços</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>ID Usuário</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        servicos.forEach(servico => {
            container += `
            <tr>
                <td>${servico.id_usuario}</td>
                <td>${servico.descricao_servico}</td>
                <td><span class="badge bg-${this.getBadgeStatus(servico.status_servico)}">${servico.status_servico}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary editar-servico" data-id="${servico.uuid_servico}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-servico" data-id="${servico.uuid_servico}">Excluir</button>
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
                        <h5 class="modal-title">Editar Serviço</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-servico-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="id_usuario" class="form-label">Usuário Responsável:</label>
                                <select class="form-select" id="id_usuario_edit" disabled>
                                    <option value="">Carregando...</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="descricao" class="form-label">Descrição:</label>
                                <input type="text" class="form-control" id="descricao_edit" required/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="status" class="form-label">Status:</label>
                                <select class="form-select" id="status_edit">
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="EM_ANDAMENTO">Em Andamento</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="data_conclusao" class="form-label">Data Conclusão:</label>
                                <input type="date" class="form-control" id="data_conclusao_edit"/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="foto" class="form-label">Foto (URL):</label>
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
                        <div class="card-header bg-success text-white">
                            <h4 class="mb-0">Cadastrar Novo Serviço</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-servico-criar">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuário Responsável:</label>
                                    <select class="form-select" id="id_usuario" required>
                                        <option value="" selected disabled>Carregando usuários...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descrição:</label>
                                    <input type="text" class="form-control" id="descricao" required/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status:</label>
                                    <select class="form-select" id="status">
                                        <option value="PENDENTE">Pendente</option>
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
                                    <label for="foto" class="form-label">Foto (URL):</label>
                                    <input type="text" class="form-control" id="foto"/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">Cadastrar Serviço</button>
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
            case 'CONCLUIDO': return 'success';
            case 'EM_ANDAMENTO': return 'primary';
            case 'CANCELADO': return 'danger';
            default: return 'warning';
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

export default ServicosView;