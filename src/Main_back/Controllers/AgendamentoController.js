import Agendamento from '../Models/Agendamento.js';
class AgendamentoController{
    constructor(){
        this.agendamentoModel = new Agendamento();
    }
    async listar(){
        const dados = await this.agendamentoModel.listar();
        console.log('dados no controller', dados);
        return dados
    }
    
}
export default AgendamentoController;