class PagamentoView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-success text-white">
                    <h3 class="card-title mb-0">Menu de Formas de Pagamento</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#pagamento_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Formas de Pagamento
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-credit-card"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(pagamentos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Formas de Pagamento</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Tipo de Pagamento</th>
                        </tr>
                    </thead>
                    <tbody>`;

        pagamentos.forEach(pagamento => {
            container += `
            <tr>
                <td>${pagamento.tipo_pagamento}</td>
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
}

export default PagamentoView;
