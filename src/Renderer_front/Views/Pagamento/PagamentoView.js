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
                        <a href="#pagamento_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Nova Forma de Pagamento
                            <span class="badge bg-success rounded-pill"><i class="bi bi-wallet2"></i></span>
                        </a>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        pagamentos.forEach(pagamento => {
            container += `
            <tr>
                <td>${pagamento.tipo_pagamento}</td>
                <td>
                    <button class="btn btn-sm btn-primary editar-pagamento" data-id="${pagamento.uuid_pagamento}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-pagamento" data-id="${pagamento.uuid_pagamento}">Excluir</button>
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
                        <h5 class="modal-title">Editar Forma de Pagamento</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-pagamento-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="tipo_edit" class="form-label">Tipo:</label>
                                <input type="text" class="form-control" id="tipo_edit" required placeholder="Ex: PIX, Cartão de Crédito..."/>
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
                            <h4 class="mb-0">Cadastrar Nova Forma de Pagamento</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-pagamento-criar">
                                <div class="mb-3">
                                    <label for="tipo" class="form-label">Tipo de Pagamento:</label>
                                    <input type="text" class="form-control" id="tipo" required placeholder="Ex: Dinheiro, TED, etc..."/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">Cadastrar Forma de Pagamento</button>
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

export default PagamentoView;
