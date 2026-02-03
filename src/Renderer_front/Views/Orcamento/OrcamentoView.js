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
                        <a href="#orcamento_criar" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            Gerar Novo Orçamento
                            <span class="badge bg-primary rounded-pill"><i class="bi bi-file-earmark-plus"></i></span>
                        </a>
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
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

        orcamentos.forEach(orcamento => {
            container += `
            <tr>
                <td>${orcamento.data_orcamento}</td>
                <td class="fw-bold text-success">R$ ${orcamento.valor_orcamento.toFixed(2)}</td>
                <td><span class="badge bg-${this.getBadgeStatus(orcamento.status_orcamento)}">${orcamento.status_orcamento}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary editar-orcamento" data-id="${orcamento.uuid_orcamento}">Editar</button>
                    <button class="btn btn-sm btn-danger excluir-orcamento" data-id="${orcamento.uuid_orcamento}">Excluir</button>
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
                        <h5 class="modal-title">Editar Orçamento</h5>
                        <button type="button" class="btn-close close" id="fechar" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form-orcamento-editar">
                            <input type="text" id="id" hidden/>
                            
                            <div class="mb-3">
                                <label for="valor_edit" class="form-label">Valor (R$):</label>
                                <input type="number" step="0.01" class="form-control" id="valor_edit" required/>
                            </div>

                            <div class="mb-3">
                                <label for="data_edit" class="form-label">Data Validade:</label>
                                <input type="date" class="form-control" id="data_edit" required/>
                            </div>
                            
                            <div class="mb-3">
                                <label for="status_edit" class="form-label">Status:</label>
                                <select class="form-select" id="status_edit">
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="APROVADO">Aprovado</option>
                                    <option value="REJEITADO">Rejeitado</option>
                                    <option value="EXPIRADO">Expirado</option>
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
                        <div class="card-header bg-primary text-white">
                            <h4 class="mb-0">Gerar Novo Orçamento</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-orcamento-criar">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuário:</label>
                                    <select class="form-select" id="id_usuario" required>
                                        <option value="" selected disabled>Carregando usuários...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="id_servico" class="form-label">Serviço:</label>
                                    <select class="form-select" id="id_servico" required>
                                        <option value="" selected disabled>Carregando serviços...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="id_pagamento" class="form-label">Forma de Pagamento:</label>
                                    <select class="form-select" id="id_pagamento" required>
                                        <option value="" selected disabled>Carregando formas de pagamento...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="valor" class="form-label">Valor Total (R$):</label>
                                    <input type="number" step="0.01" class="form-control" id="valor" required placeholder="0.00"/>
                                </div>

                                <div class="mb-3">
                                    <label for="data" class="form-label">Data Validade:</label>
                                    <input type="date" class="form-control" id="data" required/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Gerar Orçamento</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
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

export default OrcamentoView;
