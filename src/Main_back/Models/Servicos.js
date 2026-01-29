import db from '../Database/db.js';
import crypto from 'node:crypto'; 


class Servicos {
  constructor() {}
  adicionar(servico) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`
      INSERT INTO tbl_servico (uuid, id_usuario, descricao_servico, status_servico, data_conclusao, foto_servico, sync_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      uuid,
      servico.id_usuario, servico.descricao_servico, servico.status_servico, servico.data_conclusao, servico.foto_servico, 0);

    return info.lastInsertRowid;
    
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_servico WHERE excluido_em IS NULL`);
    return stmt.all();
  }
  remover(servico) {
    const index = this.servicos.indexOf(servico);
    if (index !== -1) {
      this.servicos.splice(index, 1);
    }
  }
  async atualizar(servicoAtualizado) {
   console.log('atualizar no model', servicoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_servico 
       SET descricao_servico = ?,
           status_servico = ?,
           data_conclusao = ?,
           telefone_usuario = ?,
           foto_servico = ?,
           sync_status = 0
       WHERE uuid = ?`
      );
    const info = stmt.run(
      servicoAtualizado.descricao_servico,
      servicoAtualizado.status_servico,
      servicoAtualizado.data_conclusao,
      servicoAtualizado.telefone_usuario,
      servicoAtualizado.foto_servico,
      servicoAtualizado.uuid
    );
    return info.changes;
  }

async remover(servico) {
    const stmt = db.prepare(`UPDATE tbl_servico SET excluido_em = CURRENT_TIMESTAMP, sync_status = 0
      WHERE uuid = ?`);
    const info = stmt.run(servico.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }
}
export default Servicos;