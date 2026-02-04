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
                        </tr>
                    </thead>
                    <tbody>`;

        Usuarios.forEach(usuario => {
            container += `
            <tr>
                <td>${usuario.nome_usuario}</td>
                <td>${usuario.email_usuario || '-'}</td>
                <td>${usuario.telefone_usuario || '...'}</td>
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
export default UsuariosView;