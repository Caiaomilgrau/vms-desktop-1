import Orcamento from '../Models/Orcamento.js';
class OrcamentoController{
    constructor(){
        this.orcamentoModel = new Orcamento();
    }
    async listar(){
        const dados = await this.orcamentoModel.listar();
        console.log('dados no controller', dados);
        return dados
        
    }
}
export default OrcamentoController;
