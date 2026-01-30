import Categorias from '../Models/Categorias.js';
class CategoriaController{
    constructor(){
        this.categoriaModel = new Categorias();
    }
    async listar(){
        const dados = await this.categoriaModel.listar();
        console.log('dados no controller', dados);
        return dados
        
    }
}
export default CategoriaController;