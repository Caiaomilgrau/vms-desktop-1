import db from '../Database/db.js';
import crypto from 'node:crypto';

class Orcamento {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_orcamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_orcamento WHERE uuid_orcamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}

export default Orcamento;