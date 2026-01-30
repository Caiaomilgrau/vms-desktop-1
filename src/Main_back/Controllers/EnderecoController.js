import Endereco from '../Models/Endereco.js';
class EnderecoController{
    constructor(){
        this.enderecoModel = new Endereco();
    }
    async listar(){
        const dados = await this.enderecoModel.listar();
        console.log('dados no controller', dados);
        return dados
    }   
}
export default EnderecoController;