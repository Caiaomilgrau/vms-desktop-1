import Pagamento from '../Models/Pagamento.js';
class PagamentoController{
    constructor(){
        this.pagamentoModel = new Pagamento();
    }

    async listar(){
        const dados = await this.pagamentoModel.listar();
        console.log('dados no controller', dados);
        return dados
    }
}
export default PagamentoController;