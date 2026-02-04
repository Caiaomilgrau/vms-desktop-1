import db from '../Database/db.js';
import crypto from 'node:crypto';

class Pagamento {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_pagamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_pagamento WHERE uuid_pagamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}

export default Pagamento;