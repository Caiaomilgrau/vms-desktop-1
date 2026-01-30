import db from '../Database/db.js';
import crypto from 'node:crypto';

class Usuarios {
  constructor() { }
  adicionar(usuario) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`
      INSERT INTO tbl_usuario (uuid_usuario, nome_usuario, email_usuario, senha_usuario, telefone_usuario, foto_usuario, tipo_usuario, status_usuario, sync_status_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      uuid,
      usuario.nome_usuario,
      usuario.email_usuario,
      usuario.senha_usuario,
      usuario.telefone_usuario,
      usuario.foto_usuario,
      usuario.tipo_usuario,
      usuario.status_usuario,
      0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE excluido_em IS NULL`);
    return stmt.all();
  }
  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_usuario WHERE uuid_usuario = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }



  async atualizar(usuarioAtualizado) {
    console.log('atualizar no model', usuarioAtualizado);
    const stmt = db.prepare(`UPDATE tbl_usuario 
       SET nome_usuario = ?,
           email_usuario = ?,
           senha_usuario = ?,
           telefone_usuario = ?,
           foto_usuario = ?,
           tipo_usuario = ?,
           status_usuario = ?,
           sync_status_usuario = 0
       WHERE uuid_usuario = ?`
    );
    const info = stmt.run(
      usuarioAtualizado.nome_usuario,
      usuarioAtualizado.email_usuario,
      usuarioAtualizado.senha_usuario,
      usuarioAtualizado.telefone_usuario,
      usuarioAtualizado.foto_usuario,
      usuarioAtualizado.tipo_usuario,
      usuarioAtualizado.status_usuario,
      usuarioAtualizado.uuid
    );
    return info.changes;
  }

  async remover(usuario) {
    const stmt = db.prepare(`UPDATE tbl_usuario SET excluido_em = CURRENT_TIMESTAMP, sync_status_usuario = 0
      WHERE uuid_usuario = ?`);
    const info = stmt.run(usuario.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }
}
export default Usuarios;