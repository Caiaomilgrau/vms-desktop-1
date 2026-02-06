import db from '../Database/db.js';
import crypto from 'node:crypto';

class Agendamento {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_agendamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_agendamento WHERE uuid_agendamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
  
}

export default Agendamento;