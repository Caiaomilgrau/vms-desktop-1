import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Pagamento {
    constructor(){}
    async adicionar(pagamento) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_pagamento (uuid, tipo_pagamento, sync_status)
             VALUES (?, ?, ?)`);
             const info = stmt.run(
                uuid,
                pagamento.tipo_pagamento,
                0
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_pagamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async atualizar(usuarioAtualizado) {
   console.log('atualizar no model', usuarioAtualizado);
    const stmt = db.prepare(`UPDATE tbl_usuarios 
       SET nome_usuario = ?,
           email_usuario = ?,
           senha_usuario = ?,
           telefone_usuario = ?,
           foto_usuario = ?,
           tipo_usuario = ?,
           status_usuario = ?,
           sync_status = 0
       WHERE uuid = ?`
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
    const stmt = db.prepare(`UPDATE tbl_usuarios SET excluido_em = CURRENT_TIMESTAMP, sync_status = 0
      WHERE uuid = ?`);
    const info = stmt.run(usuario.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Pagamento;