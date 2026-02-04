import db from '../Database/db.js';
import crypto from 'node:crypto';

class Endereco {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE uuid_endereco = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}

export default Endereco;