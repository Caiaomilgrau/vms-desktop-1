class OrcamentoView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h3 class="card-title mb-0">Menu de Orçamentos</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#orcamento_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Consultar Orçamentos
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-files"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(orcamentos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Orçamentos</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

        orcamentos.forEach(orcamento => {
            container += `
            <tr>
                <td>${orcamento.data_orcamento}</td>
                <td class="fw-bold text-success">R$ ${orcamento.valor_orcamento.toFixed(2)}</td>
                <td><span class="badge bg-${this.getBadgeStatus(orcamento.status_orcamento)}">${orcamento.status_orcamento}</span></td>
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
            case 'APROVADO': return 'success';
            case 'PENDENTE': return 'warning';
            case 'REJEITADO': return 'danger';
            case 'EXPIRADO': return 'secondary';
            default: return 'info';
        }
    }
}

export default OrcamentoView;
