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
                        </tr>
                    </thead>
                    <tbody>`;

        avaliacoes.forEach(avaliacao => {
            container += `
            <tr>
                <td>${"⭐".repeat(avaliacao.nota_avaliacao)}</td>
                <td>${avaliacao.descricao_avaliacao || '-'}</td>
                <td><span class="badge bg-${this.getBadgeStatus(avaliacao.status_avaliacao)}">${avaliacao.status_avaliacao}</span></td>
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
            case 'PUBLICADO': return 'success';
            case 'PENDENTE': return 'warning';
            case 'OCULTO': return 'secondary';
            default: return 'info';
        }
    }
}

export default AvaliacaoView;
