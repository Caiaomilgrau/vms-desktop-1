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
                        </tr>
                    </thead>
                    <tbody>`;

        agendamentos.forEach(agendamento => {
            container += `
            <tr>
                <td>${agendamento.data_agendamento}</td>
                <td>${agendamento.horario_agendamento}</td>
                <td><span class="badge bg-${this.getBadgeStatus(agendamento.status_agendamento)}">${agendamento.status_agendamento}</span></td>
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
            case 'CONFIRMADO': return 'primary';
            case 'CANCELADO': return 'danger';
            default: return 'warning';
        }
    }
}

export default AgendamentoView;
