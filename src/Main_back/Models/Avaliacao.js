import db from '../Database/db.js';
import crypto from 'node:crypto';

class Avaliacao {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE excluido_em IS NULL`);
    return stmt.all();
  }


  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE uuid_avaliacao = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}

export default Avaliacao;