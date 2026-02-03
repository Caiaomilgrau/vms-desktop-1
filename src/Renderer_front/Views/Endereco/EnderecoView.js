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
                        <a href="#endereco_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Novo Endereço
                            <span class="badge bg-secondary rounded-pill"><i class="bi bi-geo-alt-fill"></i></span>
                        </a>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        enderecos.forEach(endereco => {
            container += `
            <tr>
                <td>${endereco.logradouro_endereco}</td>
                <td>${endereco.numero_endereco}</td>
                <td>${endereco.cidade_endereco}/${endereco.uf_endereco}</td>
                <td>
                    <button class="btn btn-sm btn-primary editar-endereco" data-id="${endereco.uuid_endereco}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-endereco" data-id="${endereco.uuid_endereco}">Excluir</button>
                </td>
            </tr>`;
        });

        container += `
                    </tbody>
                </table>
            </div>
        <!-- Modal -->
        <div id="myModal" class="modal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Endereço</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-endereco-editar">
                            <input type="text" id="id" hidden/>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="cep_edit" class="form-label">CEP:</label>
                                    <input type="text" class="form-control" id="cep_edit" required/>
                                </div>
                                <div class="col-md-8 mb-3">
                                    <label for="logradouro_edit" class="form-label">Logradouro:</label>
                                    <input type="text" class="form-control" id="logradouro_edit" required/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3 mb-3">
                                    <label for="numero_edit" class="form-label">Número:</label>
                                    <input type="text" class="form-control" id="numero_edit" required/>
                                </div>
                                <div class="col-md-9 mb-3">
                                    <label for="complemento_edit" class="form-label">Complemento:</label>
                                    <input type="text" class="form-control" id="complemento_edit"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="bairro_edit" class="form-label">Bairro:</label>
                                    <input type="text" class="form-control" id="bairro_edit" required/>
                                </div>
                                <div class="col-md-5 mb-3">
                                    <label for="cidade_edit" class="form-label">Cidade:</label>
                                    <input type="text" class="form-control" id="cidade_edit" required/>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="uf_edit" class="form-label">UF:</label>
                                    <input type="text" class="form-control" id="uf_edit" required maxlength="2"/>
                                </div>
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
                <div class="col-md-10 col-lg-8">
                    <div class="card shadow">
                        <div class="card-header bg-secondary text-white">
                            <h4 class="mb-0">Cadastrar Novo Endereço</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-endereco-criar">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuário Vinculado:</label>
                                    <select class="form-select" id="id_usuario" required>
                                        <option value="" selected disabled>Carregando usuários...</option>
                                    </select>
                                </div>
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="cep" class="form-label">CEP:</label>
                                        <input type="text" class="form-control" id="cep" required/>
                                    </div>
                                    <div class="col-md-9 mb-3">
                                        <label for="logradouro" class="form-label">Logradouro:</label>
                                        <input type="text" class="form-control" id="logradouro" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <label for="numero" class="form-label">Número:</label>
                                        <input type="text" class="form-control" id="numero" required/>
                                    </div>
                                    <div class="col-md-9 mb-3">
                                        <label for="complemento" class="form-label">Complemento:</label>
                                        <input type="text" class="form-control" id="complemento"/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 mb-3">
                                        <label for="bairro" class="form-label">Bairro:</label>
                                        <input type="text" class="form-control" id="bairro" required/>
                                    </div>
                                    <div class="col-md-5 mb-3">
                                        <label for="cidade" class="form-label">Cidade:</label>
                                        <input type="text" class="form-control" id="cidade" required/>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="uf" class="form-label">UF:</label>
                                        <input type="text" class="form-control" id="uf" required maxlength="2"/>
                                    </div>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-secondary">Salvar Endereço</button>
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

export default EnderecoView;
