import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Orcamento {
    constructor(){}
    async adicionar(orcamento) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_orcamento (uuid, id_usuario, id_servico, id_pagamento, valor_orcamento, status_orcamento, data_orcamento)
             VALUES (?, ?, ?, ?, ?, ?, ?)`);
             const info = stmt.run(
                uuid,
                orcamento.id_usuario, orcamento.id_servico, orcamento.id_pagamento, orcamento.valor_orcamento, orcamento.status_orcamento, orcamento.data_orcamento
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_orcamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }


} export default Orcamento;