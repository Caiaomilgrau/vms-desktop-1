import UsuarioListar from "../Views/Usuario/listar/UsuarioListar.js"
import UsuariosView from "../Views/Usuario/UsuariosView.js";

import ServicoListar from "../Views/Servico/listar/ServicoListar.js";
import ServicosView from "../Views/Servico/ServicosView.js";


import AvaliacaoListar from "../Views/Avaliacao/listar/AvaliacaoListar.js";
import AvaliacaoView from "../Views/Avaliacao/AvaliacaoView.js";

import CategoriaListar from "../Views/Categoria/listar/CategoriaListar.js";
import CategoriaView from "../Views/Categoria/CategoriaView.js";

import EnderecoListar from "../Views/Endereco/listar/EnderecoListar.js";
import EnderecoView from "../Views/Endereco/EnderecoView.js";


class Rotas {
    constructor() {
        this.rotas = {
            // USUARIOS
            "/usuario_menu": () => new UsuariosView().renderizarMenu(),
            "/usuario_listar": async () => await new UsuarioListar().renderizarLista(),

            // SERVICOS
            "/servico_menu": () => new ServicosView().renderizarMenu(),
            "/servico_listar": async () => await new ServicoListar().renderizarLista(),

      
            // AVALIACOES
            "/avaliacao_menu": () => new AvaliacaoView().renderizarMenu(),
            "/avaliacao_listar": async () => await new AvaliacaoListar().renderizarLista(),

            // CATEGORIAS
            "/categoria_menu": () => new CategoriaView().renderizarMenu(),
            "/categoria_listar": async () => await new CategoriaListar().renderizarLista(),

            // ENDERECOS
            "/endereco_menu": () => new EnderecoView().renderizarMenu(),
            "/endereco_listar": async () => await new EnderecoListar().renderizarLista(),

          
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