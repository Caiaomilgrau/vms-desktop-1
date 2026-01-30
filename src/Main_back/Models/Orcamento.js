import db from '../Database/db.js';
import crypto from 'node:crypto';

class Orcamento {
  constructor() { }
  async adicionar(orcamento) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_orcamento (uuid_orcamento, id_usuario, id_servico, id_pagamento, valor_orcamento, status_orcamento, data_orcamento, sync_status_orcamento)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(
      uuid,
      orcamento.id_usuario, orcamento.id_servico, orcamento.id_pagamento, orcamento.valor_orcamento, orcamento.status_orcamento, orcamento.data_orcamento, 0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_orcamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_orcamento WHERE uuid_orcamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }


  async atualizar(orcamentoAtualizado) {
    console.log('atualizar no model', orcamentoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_orcamento 
       SET id_usuario = ?,
           id_servico = ?,
           id_pagamento = ?,
           valor_orcamento = ?,
           status_orcamento = ?,
           data_orcamento = ?,
           sync_status_orcamento = 0
       WHERE uuid_orcamento = ?`
    );
    const info = stmt.run(
      orcamentoAtualizado.id_usuario,
      orcamentoAtualizado.id_servico,
      orcamentoAtualizado.id_pagamento,
      orcamentoAtualizado.valor_orcamento,
      orcamentoAtualizado.status_orcamento,
      orcamentoAtualizado.data_orcamento,
      orcamentoAtualizado.uuid
    );
    return info.changes;
  }

  async remover(orcamento) {
    const stmt = db.prepare(`UPDATE tbl_orcamento SET excluido_em = CURRENT_TIMESTAMP, sync_status_orcamento = 0
      WHERE uuid_orcamento = ?`);
    const info = stmt.run(orcamento.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Orcamento;