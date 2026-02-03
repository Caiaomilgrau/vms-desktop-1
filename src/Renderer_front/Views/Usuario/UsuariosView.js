class UsuariosView {
    constructor() {
    }

    renderizarMenu() {
        return `
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h3 class="card-title mb-0">Menu de Usuários</h3>
                </div>
                <div class="card-body">
                    <div class="list-group">
                        <a href="#usuario_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Criar Usuário
                            <span class="badge bg-primary rounded-pill"><i class="bi bi-plus"></i></span>
                        </a>
                        <a href="#usuario_listar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Listar Usuários
                            <span class="badge bg-info rounded-pill"><i class="bi bi-list"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    renderizarLista(Usuarios) {
        let container = `
        <div id="container" class="container mt-4">
            <h2 class="mb-4">Lista de Usuários</h2>
            <div class="table-responsive shadow-sm">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        Usuarios.forEach(usuario => {
            container += `
            <tr>
                <td>${usuario.nome_usuario}</td>
                <td>${usuario.email_usuario || '-'}</td>
                <td>${usuario.telefone_usuario || '...'}</td>
                <td>
                    <button class="btn btn-sm btn-primary editar-user" data-id="${usuario.uuid_usuario}">Editar</button>
                    <button class="btn btn-sm btn-danger exclusion-user excluir-user" data-id="${usuario.uuid_usuario}">Excluir</button>
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
                        <h5 class="modal-title">Editar Usuário</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-usuario">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="nome" class="form-label">Nome:</label>
                                <input type="text" class="form-control" id="nome"/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">E-mail:</label>
                                <input type="text" class="form-control" id="email"/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="telefone" class="form-label">Telefone:</label>
                                <input type="text" class="form-control" id="telefone"/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="foto" class="form-label">Foto (URL):</label>
                                <input type="text" class="form-control" id="foto"/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="tipo" class="form-label">Tipo:</label>
                                <select class="form-select" id="tipo">
                                    <option value="PADRAO">Padrão</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="status" class="form-label">Status:</label>
                                <select class="form-select" id="status">
                                    <option value="ATIVO">Ativo</option>
                                    <option value="INATIVO">Inativo</option>
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
                        <div class="card-header bg-success text-white">
                            <h4 class="mb-0">Cadastrar Novo Usuário</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-usuario">
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome:</label>
                                    <input type="text" class="form-control" id="nome" name="nome" required/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="email" class="form-label">E-mail:</label>
                                    <input type="email" class="form-control" id="email" name="email" required/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="telefone" class="form-label">Telefone:</label>
                                    <input type="text" class="form-control" id="telefone" name="telefone"/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto (URL):</label>
                                    <input type="text" class="form-control" id="foto" name="foto"/>
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="tipo" class="form-label">Tipo:</label>
                                        <select class="form-select" id="tipo" name="tipo">
                                            <option value="PADRAO">Padrão</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="status" class="form-label">Status:</label>
                                        <select class="form-select" id="status" name="status">
                                            <option value="ATIVO">Ativo</option>
                                            <option value="INATIVO">Inativo</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="senha" class="form-label">Senha:</label>
                                    <input type="password" class="form-control" id="senha" name="senha" required/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    abrirModal() {
        // Manual override to show modal with backdrop simulation
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
export default UsuariosView;