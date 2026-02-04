import UsuarioListar from "../Views/Usuario/listar/UsuarioListar.js"
import UsuariosView from "../Views/Usuario/UsuariosView.js";

import ServicoListar from "../Views/Servico/listar/ServicoListar.js";
import ServicosView from "../Views/Servico/ServicosView.js";

import AgendamentoListar from "../Views/Agendamento/listar/AgendamentoListar.js";
import AgendamentoView from "../Views/Agendamento/AgendamentoView.js";

import AvaliacaoListar from "../Views/Avaliacao/listar/AvaliacaoListar.js";
import AvaliacaoView from "../Views/Avaliacao/AvaliacaoView.js";

import CategoriaListar from "../Views/Categoria/listar/CategoriaListar.js";
import CategoriaView from "../Views/Categoria/CategoriaView.js";

import EnderecoListar from "../Views/Endereco/listar/EnderecoListar.js";
import EnderecoView from "../Views/Endereco/EnderecoView.js";

import OrcamentoListar from "../Views/Orcamento/listar/OrcamentoListar.js";
import OrcamentoView from "../Views/Orcamento/OrcamentoView.js";

import PagamentoListar from "../Views/Pagamento/listar/PagamentoListar.js";
import PagamentoView from "../Views/Pagamento/PagamentoView.js";

class Rotas {
    constructor() {
        this.rotas = {
            // USUARIOS
            "/usuario_menu": () => new UsuariosView().renderizarMenu(),
            "/usuario_listar": async () => await new UsuarioListar().renderizarLista(),

            // SERVICOS
            "/servico_menu": () => new ServicosView().renderizarMenu(),
            "/servico_listar": async () => await new ServicoListar().renderizarLista(),

            // AGENDAMENTOS
            "/agendamento_menu": () => new AgendamentoView().renderizarMenu(),
            "/agendamento_listar": async () => await new AgendamentoListar().renderizarLista(),

            // AVALIACOES
            "/avaliacao_menu": () => new AvaliacaoView().renderizarMenu(),
            "/avaliacao_listar": async () => await new AvaliacaoListar().renderizarLista(),

            // CATEGORIAS
            "/categoria_menu": () => new CategoriaView().renderizarMenu(),
            "/categoria_listar": async () => await new CategoriaListar().renderizarLista(),

            // ENDERECOS
            "/endereco_menu": () => new EnderecoView().renderizarMenu(),
            "/endereco_listar": async () => await new EnderecoListar().renderizarLista(),

            // ORCAMENTOS
            "/orcamento_menu": () => new OrcamentoView().renderizarMenu(),
            "/orcamento_listar": async () => await new OrcamentoListar().renderizarLista(),

            // PAGAMENTOS
            "/pagamento_menu": () => new PagamentoView().renderizarMenu(),
            "/pagamento_listar": async () => await new PagamentoListar().renderizarLista(),
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