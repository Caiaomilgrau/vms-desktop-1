import Servicos from '../Models/Servicos.js';
class ServicoController{
    constructor(){
        this.servicoModel = new Servicos();
    }
    async listar(){
        const dados = await this.servicoModel.listar();
        console.log('dados no controller', dados);
        return dados
        
    }

}
export default ServicoController;