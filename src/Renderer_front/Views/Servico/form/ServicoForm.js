import ServicosView from "../ServicosView.js";
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js";

class ServicoForm {
    constructor() {
        this.view = new ServicosView();
        this.mensagem = new MensagemDeAlerta();
    }

    renderizarFormulario() {
        setTimeout(() => {
            this.adicionarEventos();
        }, 0);

        return `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="card shadow">
                        <div class="card-header bg-success text-white">
                            <h4 class="mb-0">Cadastrar Novo Serviço</h4>
                        </div>
                        <div class="card-body">
                            <form id="form-servico-criar">
                                <div class="mb-3">
                                    <label for="id_usuario" class="form-label">Usuário Responsável:</label>
                                    <select class="form-select" id="id_usuario" required>
                                        <option value="" selected disabled>Carregando usuários...</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descrição:</label>
                                    <input type="text" class="form-control" id="descricao" required/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="status" class="form-label">Status:</label>
                                    <select class="form-select" id="status">
                                        <option value="ABERTO">Aberto</option>
                                        <option value="EM_ANDAMENTO">Em Andamento</option>
                                        <option value="CONCLUIDO">Concluído</option>
                                        <option value="CANCELADO">Cancelado</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="data_conclusao" class="form-label">Data Conclusão:</label>
                                    <input type="date" class="form-control" id="data_conclusao"/>
                                </div>
                                
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto (URL):</label>
                                    <input type="text" class="form-control" id="foto"/>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">Cadastrar Serviço</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    async adicionarEventos() {
        const formulario = document.getElementById('form-servico-criar');
        const selectUsuario = document.getElementById('id_usuario');

        // Fetch users to populate the dropdown
        if (selectUsuario) {
            try {
                const resposta = await window.api.listar();
                if (resposta.success && Array.isArray(resposta.data)) {
                    selectUsuario.innerHTML = '<option value="" selected disabled>Selecione um usuário</option>';
                    resposta.data.forEach(usuario => {
                        const option = document.createElement('option');
                        option.value = usuario.uuid_usuario;
                        option.textContent = usuario.nome_usuario;
                        selectUsuario.appendChild(option);
                    });
                } else {
                    selectUsuario.innerHTML = '<option value="" disabled>Erro ao carregar usuários</option>';
                    this.mensagem.erro("Falha ao carregar lista de usuários.");
                }
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                selectUsuario.innerHTML = '<option value="" disabled>Erro ao carregar usuários</option>';
            }
        }

        if (!formulario) return;

        formulario.addEventListener('submit', async (event) => {
            event.preventDefault();

            const servico = {
                id_usuario: document.getElementById('id_usuario').value,
                descricao: document.getElementById('descricao').value,
                status: document.getElementById('status').value,
                data_conclusao: document.getElementById('data_conclusao').value,
                foto: document.getElementById('foto').value
            };

            const resposta = await window.api.cadastrarServico(servico);

            if (resposta.success) {
                // Clear form
                document.getElementById('id_usuario').value = '';
                document.getElementById('descricao').value = '';
                document.getElementById('status').value = 'ABERTO';
                document.getElementById('data_conclusao').value = '';
                document.getElementById('foto').value = '';

                this.mensagem.sucesso(resposta.message);
            } else {
                this.mensagem.erro(resposta.message);
            }
        })
    }
}

export default ServicoForm;
