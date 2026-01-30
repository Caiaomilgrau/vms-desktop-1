import UsuariosView from "../UsuariosView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js"
class UsuarioListar {
    constructor() {
        this.view = new UsuariosView();
        this.mensagem = new MensagemDeAlerta();
        this.app = document.getElementById("app");
    }
    async renderizarLista() {
        const resposta = await window.api.listar();
        console.log('dados na usuario lista', resposta);

        let dadosParaExibir = [];
        if (resposta.success) {
            dadosParaExibir = resposta.data;
        } else {
            console.error(resposta.message);
            // Poderia mostrar erro na tela aqui
        }

        setTimeout(() => {
            this.adicionarEventos();
        }, 0)
        return this.view.renderizarLista(dadosParaExibir)
    }
    adicionarEventos() {
        this.app = document.getElementById("container");
        this.app.addEventListener("click", async (e) => {
            const idUsuario = e.target.getAttribute("data-id");
            if (e.target.classList.contains("editar-user")) {
                console.log("editar usuario id:", idUsuario);
                const resposta = await window.api.buscarPorId(idUsuario)
                if (resposta.success && resposta.data) {
                    const usuario = resposta.data;
                    const id = document.getElementById("id")
                    const nome = document.getElementById("nome")
                    const email = document.getElementById("email")
                    const telefone = document.getElementById("telefone")
                    const foto = document.getElementById("foto")
                    const tipo = document.getElementById("tipo")
                    const status = document.getElementById("status")
                    // Corrigindo mapeamento: view tinha 'idade' mas controller e model não tem
                    // Vamos assumir que a modal tem email se tiver campo id/nome
                    id.value = usuario.uuid_usuario
                    nome.value = usuario.nome_usuario
                    if (email) email.value = usuario.email_usuario
                    if (telefone) telefone.value = usuario.telefone_usuario
                    if (foto) foto.value = usuario.foto_usuario
                    if (tipo) tipo.value = usuario.tipo_usuario
                    if (status) status.value = usuario.status_usuario

                    this.view.abrirModal();
                } else {
                    this.mensagem.erro("Erro ao buscar usuário: " + resposta.message);
                }
            }
            if (e.target.classList.contains("excluir-user")) {
                const resposta = await window.api.removerUsuario(idUsuario);
                console.log(resposta)
                if (resposta.success) {
                    this.mensagem.sucesso(resposta.message);
                    setTimeout(async () => {
                        document.getElementById("app").innerHTML = await this.renderizarLista();
                    }, 1500)
                    return true
                } else {
                    this.mensagem.erro(resposta.message || "Erro ao tentar excluir!")
                }
            }
            if (e.target.classList.contains("close")) {
                this.view.fecharModal();
            }
        })
        const formulario = document.getElementById('form-usuario');
        if (formulario) {
            formulario.addEventListener('submit', async (event) => {
                event.preventDefault();
                console.log(event)
                const id = document.getElementById('id');
                const nome = document.getElementById('nome');
                const email = document.getElementById('email');
                const telefone = document.getElementById('telefone');
                const foto = document.getElementById('foto');
                const tipo = document.getElementById('tipo');
                const status = document.getElementById('status');
                // View antiga tinha 'idade', mas model tem 'email'. Ajustando.

                const usuario = {
                    uuid: id.value,
                    nome: nome.value,
                    email: email ? email.value : null,
                    telefone: telefone ? telefone.value : null,
                    foto: foto ? foto.value : null,
                    tipo: tipo ? tipo.value : null,
                    status: status ? status.value : null
                }
                console.log("Enviando atualização:", usuario)
                const resposta = await window.api.editarUsuario(usuario);
                if (resposta.success) {
                    nome.value = '';
                    if (email) email.value = '';
                    if (telefone) telefone.value = '';
                    if (foto) foto.value = '';
                    this.mensagem.sucesso(resposta.message);
                } else {
                    this.mensagem.erro(resposta.message || "Erro ao atualizar!");
                }
            })
        }
    }
}
export default UsuarioListar;