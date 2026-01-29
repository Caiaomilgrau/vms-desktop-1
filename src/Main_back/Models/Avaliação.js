import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Avaliacao {
    constructor(){}
    async adicionar(avaliacao) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_avaliacao (uuid, id_usuario, id_servico, descricao_avaliacao, nota_avaliacao, status_avaliacao, foto_avaliacao)
             VALUES (?, ?, ?, ?, ?, ?, ?)`);
             const info = stmt.run(
                uuid,
                avaliacao.id_usuario, avaliacao.id_servico, avaliacao.descricao_avaliacao, avaliacao.nota_avaliacao, avaliacao.status_avaliacao, avaliacao.foto_avaliacao
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE excluido_em IS NULL`);
    return stmt.all();
  }


} export default Avaliacao;