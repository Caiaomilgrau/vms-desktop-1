import db from '../Database/db.js';
import crypto from 'node:crypto';

class Categoria {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE uuid_categoria = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}

export default Categoria;