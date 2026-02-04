import db from '../Database/db.js';
import crypto from 'node:crypto';

class Usuarios {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE excluido_em IS NULL`);
    return stmt.all();
  }
  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE uuid_usuario = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
}
export default Usuarios;