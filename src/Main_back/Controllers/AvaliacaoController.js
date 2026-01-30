import Avaliacaoes from '../Models/Avaliacoes.js';
class AvaliacaoController{
    constructor(){
        this.avaliacaoModel = new Avaliacaoes();
    }
    async listar(){
        const dados = await this.avaliacaoModel.listar();
        console.log('dados no controller', dados);
        return dados
    }
}
export default AvaliacaoController;