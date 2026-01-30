class UsuariosView {
    constructor() {
    }
    renderizarMenu() {
        return `<div class="container">
                    <ul>
                        <li><a href="#usuario_criar">Criar Usuário</a></li>
                        <li><a href="#usuario_listar">Listar Usuários</a></li>
                    </ul>
                </div>`;
    }

    renderizarLista(Usuarios) {
        let container = `<div id="container" style="overflow-x:auto;">
                            <table>
                            <tr>
                              <th>Nome</th><th>Email</th><th>Telefone</th><th>ações</th>
                            </tr>`;
        Usuarios.forEach(usuario => {// data = atributo
            container += `<tr><td> ${usuario.nome_usuario}  </td><td> 
                                   ${usuario.email_usuario}  </td><td>  
                                   ${usuario.telefone_usuario || '...'} </td><td> 
            <button class="editar-user" data-id="${usuario.uuid_usuario}">Editar</button>
            <button class="excluir-user" data-id="${usuario.uuid_usuario}">Excluir</button> </td><tr>`;
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
                    <label>Telefone:</label>
                    <input type="text" id="telefone"/>
                    <label>Foto:</label>
                    <input type="text" id="foto"/>
                    <label>Tipo:</label>
                     <select id="tipo">
                        <option value="PADRAO">Padrão</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <label>Status:</label>
                     <select id="status">
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                    </select>
                
                    <button>Salvar</button>
                </form>
            </div>
        </div>
        
        `;
        return container;
    }
    renderizarFormulario() {
        return `<form id="form-usuario">
                    <label>Nome:</label>
                    <input type="text" id="nome" name="nome"/>
                    <label>E-mail:</label>
                    <input type="text" id="email" name="email"/>
                    <label>Telefone:</label>
                    <input type="text" id="telefone" name="telefone"/>
                    <label>Foto (URL):</label>
                    <input type="text" id="foto" name="foto"/>
                    <label>Tipo:</label>
                    <select id="tipo" name="tipo">
                        <option value="PADRAO">Padrão</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                    <label>Status:</label>
                    <select id="status" name="status">
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                    </select>
                    <label>Senha:</label>
                    <input type="text" id="senha" name="senha"/>
                    
                    <button>Salvar</button>
                </form>`
    }
    abrirModal() {
        const modal = document.getElementById("myModal")
        modal.style.display = "block"
    }

    fecharModal() {
        const modal = document.getElementById("myModal")
        modal.style.display = "none"
    }
}
export default UsuariosView;