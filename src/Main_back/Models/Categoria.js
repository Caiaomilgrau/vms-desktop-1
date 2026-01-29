import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Categoria {
    constructor(){}
    async adicionar(categoria) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_categoria (uuid, nome_categoria, descricao_categoria, foto_categoria)
             VALUES (?, ?, ?, ?)`);
             const info = stmt.run(
                uuid,
                categoria.nome_categoria, categoria.descricao_categoria, categoria.foto_categoria
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE excluido_em IS NULL`);
    return stmt.all();
  }


} export default Categoria;