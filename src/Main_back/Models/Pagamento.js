import db from '../Database/db.js';
import crypto from 'node:crypto';

class Pagamento {
  constructor() { }
  async adicionar(pagamento) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_pagamento (uuid_pagamento, tipo_pagamento, sync_status_pagamento)
             VALUES (?, ?, ?)`);
    const info = stmt.run(
      uuid,
      pagamento.tipo_pagamento,
      0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_pagamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_pagamento WHERE uuid_pagamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async atualizar(pagamentoAtualizado) {
    console.log('atualizar no model', pagamentoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_pagamento
       SET tipo_pagamento = ?,
           sync_status_pagamento = 0
       WHERE uuid_pagamento = ?`
    );
    const info = stmt.run(
      pagamentoAtualizado.tipo_pagamento,
      pagamentoAtualizado.uuid
    );
    return info.changes;
  }

  async remover(pagamento) {
    const stmt = db.prepare(`UPDATE tbl_pagamento SET excluido_em = CURRENT_TIMESTAMP, sync_status_pagamento = 0
      WHERE uuid_pagamento = ?`);
    const info = stmt.run(pagamento.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Pagamento;