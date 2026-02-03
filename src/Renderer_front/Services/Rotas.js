import UsuarioListar from "../Views/Usuario/listar/UsuarioListar.js"
import UsuarioForm from "../Views/Usuario/form/UsuarioForm.js"
import UsuariosView from "../Views/Usuario/UsuariosView.js";

import ServicoListar from "../Views/Servico/listar/ServicoListar.js";
import ServicoForm from "../Views/Servico/form/ServicoForm.js";
import ServicosView from "../Views/Servico/ServicosView.js";

import AgendamentoListar from "../Views/Agendamento/listar/AgendamentoListar.js";
import AgendamentoForm from "../Views/Agendamento/form/AgendamentoForm.js";
import AgendamentoView from "../Views/Agendamento/AgendamentoView.js";

import AvaliacaoListar from "../Views/Avaliacao/listar/AvaliacaoListar.js";
import AvaliacaoForm from "../Views/Avaliacao/form/AvaliacaoForm.js";
import AvaliacaoView from "../Views/Avaliacao/AvaliacaoView.js";

import CategoriaListar from "../Views/Categoria/listar/CategoriaListar.js";
import CategoriaForm from "../Views/Categoria/form/CategoriaForm.js";
import CategoriaView from "../Views/Categoria/CategoriaView.js";

import EnderecoListar from "../Views/Endereco/listar/EnderecoListar.js";
import EnderecoForm from "../Views/Endereco/form/EnderecoForm.js";
import EnderecoView from "../Views/Endereco/EnderecoView.js";

import OrcamentoListar from "../Views/Orcamento/listar/OrcamentoListar.js";
import OrcamentoForm from "../Views/Orcamento/form/OrcamentoForm.js";
import OrcamentoView from "../Views/Orcamento/OrcamentoView.js";

import PagamentoListar from "../Views/Pagamento/listar/PagamentoListar.js";
import PagamentoForm from "../Views/Pagamento/form/PagamentoForm.js";
import PagamentoView from "../Views/Pagamento/PagamentoView.js";

class Rotas {
    constructor() {
        this.rotas = {
            // USUARIOS
            "/usuario_menu": () => new UsuariosView().renderizarMenu(),
            "/usuario_listar": async () => await new UsuarioListar().renderizarLista(),
            "/usuario_criar": () => new UsuarioForm().renderizarFormulario(),

            // SERVICOS
            "/servico_menu": () => new ServicosView().renderizarMenu(),
            "/servico_listar": async () => await new ServicoListar().renderizarLista(),
            "/servico_criar": () => new ServicoForm().renderizarFormulario(),

            // AGENDAMENTOS
            "/agendamento_menu": () => new AgendamentoView().renderizarMenu(),
            "/agendamento_listar": async () => await new AgendamentoListar().renderizarLista(),
            "/agendamento_criar": () => new AgendamentoForm().renderizarFormulario(),

            // AVALIACOES
            "/avaliacao_menu": () => new AvaliacaoView().renderizarMenu(),
            "/avaliacao_listar": async () => await new AvaliacaoListar().renderizarLista(),
            "/avaliacao_criar": () => new AvaliacaoForm().renderizarFormulario(),

            // CATEGORIAS
            "/categoria_menu": () => new CategoriaView().renderizarMenu(),
            "/categoria_listar": async () => await new CategoriaListar().renderizarLista(),
            "/categoria_criar": () => new CategoriaForm().renderizarFormulario(),

            // ENDERECOS
            "/endereco_menu": () => new EnderecoView().renderizarMenu(),
            "/endereco_listar": async () => await new EnderecoListar().renderizarLista(),
            "/endereco_criar": () => new EnderecoForm().renderizarFormulario(),

            // ORCAMENTOS
            "/orcamento_menu": () => new OrcamentoView().renderizarMenu(),
            "/orcamento_listar": async () => await new OrcamentoListar().renderizarLista(),
            "/orcamento_criar": () => new OrcamentoForm().renderizarFormulario(),

            // PAGAMENTOS
            "/pagamento_menu": () => new PagamentoView().renderizarMenu(),
            "/pagamento_listar": async () => await new PagamentoListar().renderizarLista(),
            "/pagamento_criar": () => new PagamentoForm().renderizarFormulario(),
        }
    }
    async getPage(rota) {
        if (this.rotas[rota]) {
            return await this.rotas[rota]();
        }
        return `<h2>Página não encontrada: ${rota}</h2>`;
    }
}
export default Rotas;