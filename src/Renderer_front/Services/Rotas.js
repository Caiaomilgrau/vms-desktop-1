import UsuarioListar from "../Views/Usuario/listar/UsuarioListar.js"
import UsuarioForm from "../Views/Usuario/form/UsuarioForm.js"
import UsuariosView from "../Views/Usuario/UsuariosView.js";
import ServicosView from "../Views/Servico/ServicosView.js";
import ServicoListar from "../Views/Servico/listar/ServicoListar.js";
import ServicoForm from "../Views/Servico/form/ServicoForm.js";

class Rotas {
    constructor() {
        this.rotas = {
            // chave         : valor
            "/usuario_listar": async () => {
                return new UsuarioListar().renderizarLista();
            },
            "/usuario_criar": () => {
                return new UsuarioForm().renderizarFormulario();
            },
            "/usuario_menu": () => {
                return new UsuariosView().renderizarMenu();
            },

            // SERVICOS
            "/servico_menu": () => {
                return new ServicosView().renderizarMenu();
            },
            "/servico_listar": async () => {
                return new ServicoListar().renderizarLista();
            },
            "/servico_criar": () => {
                return new ServicoForm().renderizarFormulario();
            }
        }
    }
    async getPage(rota) {
        // /usuario_listar
        // UsuarioListar()
        return await this.rotas[rota]();
    }
}
export default Rotas;