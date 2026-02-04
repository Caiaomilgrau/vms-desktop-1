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
                        </tr>
                    </thead>
                    <tbody>`;

        servicos.forEach(servico => {
            container += `
            <tr>
                <td>${servico.id_usuario}</td>
                <td>${servico.descricao_servico}</td>
                <td><span class="badge bg-${this.getBadgeStatus(servico.status_servico)}">${servico.status_servico}</span></td>
            </tr>`;
        });

        container += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
        return container;
    }

    getBadgeStatus(status) {
        switch (status) {
            case 'CONCLUIDO': return 'success';
            case 'EM_ANDAMENTO': return 'primary';
            case 'CANCELADO': return 'danger';
            default: return 'warning';
        }
    }
}

export default ServicosView;