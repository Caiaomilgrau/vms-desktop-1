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
                        <a href="#categoria_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Nova Categoria
                            <span class="badge bg-dark rounded-pill"><i class="bi bi-tag-fill"></i></span>
                        </a>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        categorias.forEach(categoria => {
            container += `
            <tr>
                <td>${categoria.nome_categoria}</td>
                <td>${categoria.descricao_categoria || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary editar-categoria" data-id="${categoria.uuid_categoria}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-categoria" data-id="${categoria.uuid_categoria}">Excluir</button>
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
                        <h5 class="modal-title">Editar Categoria</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-categoria-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="nome_edit" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome_edit" required/>
                            </div>

                            <div class="mb-3">
                                <label for="descricao_edit" class="form-label">Descrição:</label>
                                <input type="text" class="form-control" id="descricao_edit"/>
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
                        <div class="card-header bg-dark text-white">
                            <h4 class="mb-0">Cadastrar Nova Categoria</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-categoria-criar">
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome:</label>
                                    <input type="text" class="form-control" id="nome" required/>
                                </div>

                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descrição:</label>
                                    <input type="text" class="form-control" id="descricao"/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto (URL):</label>
                                    <input type="text" class="form-control" id="foto"/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-dark">Criar Categoria</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
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

export default CategoriaView;
