class AgendamentoView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-info text-white">
                    <h3 class="card-title mb-0">Menu de Agendamentos</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#agendamento_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Novo Agendamento
                            <span class="badge bg-info rounded-pill"><i class="bi bi-calendar-plus"></i></span>
                        </a>
                        <a href="#agendamento_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Agendamentos
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-calendar3"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(agendamentos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Agendamentos</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        agendamentos.forEach(agendamento => {
            container += `
            <tr>
                <td>${agendamento.data_agendamento}</td>
                <td>${agendamento.horario_agendamento}</td>
                <td><span class="badge bg-${this.getBadgeStatus(agendamento.status_agendamento)}">${agendamento.status_agendamento}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary editar-agendamento" data-id="${agendamento.uuid_agendamento}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-agendamento" data-id="${agendamento.uuid_agendamento}">Excluir</button>
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
                        <h5 class="modal-title">Editar Agendamento</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-agendamento-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="id_usuario_edit" class="form-label">Usuário:</label>
                                <select class="form-select" id="id_usuario_edit" disabled>
                                    <option value="">Carregando...</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="id_servico_edit" class="form-label">Serviço:</label>
                                <select class="form-select" id="id_servico_edit" disabled>
                                    <option value="">Carregando...</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="data_edit" class="form-label">Data:</label>
                                <input type="date" class="form-control" id="data_edit" required/>
                            </div>

                            <div class="mb-3">
                                <label for="horario_edit" class="form-label">Horário:</label>
                                <input type="time" class="form-control" id="horario_edit" required/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="status_edit" class="form-label">Status:</label>
                                <select class="form-select" id="status_edit">
                                    <option value="AGENDADO">Agendado</option>
                                    <option value="CONFIRMADO">Confirmado</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
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
                        <div class="card-header bg-info text-white">
                            <h4 class="mb-0">Cadastrar Novo Agendamento</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-agendamento-criar">
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
                                    <label for="data" class="form-label">Data:</label>
                                    <input type="date" class="form-control" id="data" required/>
                                </div>

                                <div class="mb-3">
                                    <label for="horario" class="form-label">Horário:</label>
                                    <input type="time" class="form-control" id="horario" required/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status:</label>
                                    <select class="form-select" id="status">
                                        <option value="AGENDADO">Agendado</option>
                                        <option value="CONFIRMADO">Confirmado</option>
                                    </select>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-info text-white">Criar Agendamento</button>
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
            case 'CONFIRMADO': return 'primary';
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

export default AgendamentoView;
