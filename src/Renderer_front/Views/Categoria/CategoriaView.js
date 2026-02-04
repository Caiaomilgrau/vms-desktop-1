class CategoriaView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-dark text-white">
                    <h3 class="card-title mb-0">Menu de Categorias</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#categoria_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Categorias
                            <span class="badge bg-secondary rounded-pill"><i class="bi bi-tags"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(categorias) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Categorias</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>`;

        categorias.forEach(categoria => {
            container += `
            <tr>
                <td>${categoria.nome_categoria}</td>
                <td>${categoria.descricao_categoria || '-'}</td>
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

export default CategoriaView;
