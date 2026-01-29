import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Endereco {
    constructor(){}
    async adicionar(endereco) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_endereco (uuid, id_usuario, cep_endereco, rua_endereco, numero_endereco, complemento_endereco, bairro_endereco, cidade_endereco, uf_endereco)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
             const info = stmt.run(
                uuid,
                endereco.id_usuario, endereco.cep_endereco, endereco.rua_endereco, endereco.numero_endereco, endereco.complemento_endereco, endereco.bairro_endereco, endereco.cidade_endereco, endereco.uf_endereco
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE excluido_em IS NULL`);
    return stmt.all();
  }


} export default Endereco;