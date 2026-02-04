import db from '../Database/db.js';
import crypto from 'node:crypto';


class Servicos {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_servico WHERE excluido_em IS NULL`);
    return stmt.all();
  }
  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_servico WHERE uuid_servico = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}
export default Servicos;