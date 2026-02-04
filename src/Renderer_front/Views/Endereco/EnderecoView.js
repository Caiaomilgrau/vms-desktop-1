class EnderecoView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-secondary text-white">
                    <h3 class="card-title mb-0">Menu de Endereços</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#endereco_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Endereços
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-map"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(enderecos) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Endereços</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Logradouro</th>
                            <th>Nº</th>
                            <th>Cidade/UF</th>
                        </tr>
                    </thead>
                    <tbody>`;

        enderecos.forEach(endereco => {
            container += `
            <tr>
                <td>${endereco.logradouro_endereco}</td>
                <td>${endereco.numero_endereco}</td>
                <td>${endereco.cidade_endereco}/${endereco.uf_endereco}</td>
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

export default EnderecoView;
