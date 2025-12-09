import UsuariosView from "../UsuariosView.js"
import MensagemDeAlerta from "../../../Services/MensagemDeAlerta.js" 
class UsuarioListar{
    constructor(){
        this.view = new UsuariosView();
        this.mensagem = new MensagemDeAlerta();
        
    }
    async renderizarLista(){
        const dados = await window.api.listar();
        console.log('dados na usuario lista', dados);
        setTimeout(()=>{
            this.adicionarEventos();
        },0)
       return this.listagem(dados)
    }
    listagem(Usuarios){
        let container =`<div style="overflow-x:auto;" id="container">
                            <table>
                            <tr>
                              <th>Nome</th><th>Email</th><th>ações</th>
                            </tr>`;
        Usuarios.forEach(usuario => {// data = atributo
            container += `<tr><td> ${usuario.nome}  </td><td> 
                                   ${usuario.email}  </td><td> 
            <button class="editar-user" data-id="${usuario.uuid}">Editar</button>
            <button class="excluir-user" data-id="${usuario.uuid}">Excluir</button> </td><tr>`;
        });
        container += `</table></div>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" id="fechar">&times;</span>
                <form id="form-usuario">
                    <input type="text" id="id" hidden/>
                    <label>Nome:</label>
                    <input type="text" id="nome"/>
                    <label>E-mail:</label>
                    <input type="text" id="email"/>
                
                    <button>Salvar</button>
                </form>
            </div>
        </div>
        
        `;
        return container;
    }
   
    abrirModal(){
        const modal = document.getElementById("myModal")
        modal.style.display = "block"
    }

    fecharModal(){
        const modal = document.getElementById("myModal")
        modal.style.display = "none"
    }
    renderizarFormulario(){
        return `<form id="form-usuario">
                    <label>Nome:</label>
                    <input type="text" id="nome"/>
                    <label>E-mail:</label>
                    <input type="text" id="email"/>
                    <label>Senha:</label>
                    <input type="text" id="senha"/>
                    
                    <button>Salvar</button>
                </form>`
    }
    adicionarEventos(){
        const fechar = document.getElementById("fechar");
        fechar ?.addEventListener("click", ()=>{
        this.fecharModal();
        });
        const container = document.getElementById("container");
        container.addEventListener("click", async (e)=>{
            const idUsuario = e.target.getAttribute("data-id");
            if(e.target.classList.contains("editar-user")){
                console.log("editar usuario id:", idUsuario);
                const usuario = await window.api.buscarporid(idUsuario)
                console.log("usuario encontrado:", usuario);
                 const id = document.getElementById("id")
                 console.log(id)
                const nome = document.getElementById("nome")
                const email = document.getElementById("email")
                id.value = usuario.uuid
                nome.value = usuario.nome
                email.value = usuario.email
                this.abrirModal();
            }
            if(e.target.classList.contains("excluir-user")){
                const resultado = await window.api.removerUsuario(idUsuario);
                console.log(resultado)
                if(resultado){
                     this.mensagem.sucesso("Excluído com sucesso!");
                     setTimeout(async ()=>{
                       document.getElementById("app").innerHTML = await this.renderizarLista();
                     },1500)
                     return true
                }else{
                     this.mensagem.erro("Erro ao tentar excluir!")
                }
             }
             if(e.target.classList.contains("close")){
                 this.fecharModal();
             }
         })
        
        const formulario = document.getElementById('form-usuario');
        formulario.addEventListener('submit', async (event) =>{
            event.preventDefault();
            console.log(event)
            const id = document.getElementById('id');
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const usuario = {
                uuid: id.value,
                nome: nome.value,
                email: email.value
            }
            console.log(usuario)
            const resultado = await window.api.editarUsuario(usuario);
           if(resultado){
             nome.value = '';
             email.value = '';
             this.mensagem.sucesso("Atualizado com sucesso!");
           }else{
             this.mensagem.erro("Erro ao atualizar!");
           }  
             
        })
    }
    
}
export default UsuarioListar;