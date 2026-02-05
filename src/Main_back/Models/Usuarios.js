import db from '../Database/db.js';
import crypto from 'node:crypto';

class Usuarios {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE excluido_em IS NULL`);
    return stmt.all();
  }
  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE id_usuario = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async buscarPorUuid(uuid) {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE uuid_usuario = ? AND excluido_em IS NULL`);
    return stmt.get(uuid);
  }
  async salvar(dados) {
    const stmt = db.prepare(`INSERT INTO tbl_usuario (id_usuario, nome_usuario, email_usuario, senha_usuario, telefone_usuario, foto_usuario, tipo_usuario, status_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(dados.id_usuario, dados.nome_usuario, dados.email_usuario, dados.senha_usuario, dados.telefone_usuario, dados.foto_usuario, dados.tipo_usuario, dados.status_usuario);
  }
  async buscarSincronizados(){
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE sincronizado_em IS NOT NULL`);
    return stmt.all();
  }
}
export default Usuarios;