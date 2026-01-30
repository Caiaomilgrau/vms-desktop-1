import db from '../Database/db.js';
import crypto from 'node:crypto';

class Avaliacao {
  constructor() { }
  async adicionar(avaliacao) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_avaliacao (uuid_avaliacao, id_usuario, id_servico, descricao_avaliacao, nota_avaliacao, status_avaliacao, foto_avaliacao, sync_status_avaliacao)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(
      uuid,
      avaliacao.id_usuario, avaliacao.id_servico, avaliacao.descricao_avaliacao, avaliacao.nota_avaliacao, avaliacao.status_avaliacao, avaliacao.foto_avaliacao, 0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE excluido_em IS NULL`);
    return stmt.all();
  }


  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE uuid_avaliacao = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async atualizar(avaliacaoAtualizado) {
    console.log('atualizar no model', avaliacaoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_avaliacao 
       SET id_usuario = ?,
           id_servico = ?,
           descricao_avaliacao = ?,
           nota_avaliacao = ?,
           status_avaliacao = ?,
           foto_avaliacao = ?,
           status_avaliacao = ?,
           sync_status_avaliacao = 0
       WHERE uuid_avaliacao = ?`
    );
    const info = stmt.run(
      avaliacaoAtualizado.id_usuario,
      avaliacaoAtualizado.id_servico,
      avaliacaoAtualizado.descricao_avaliacao,
      avaliacaoAtualizado.nota_avaliacao,
      avaliacaoAtualizado.status_avaliacao,
      avaliacaoAtualizado.foto_avaliacao,
      avaliacaoAtualizado.status_avaliacao,
      avaliacaoAtualizado.uuid
    );
    return info.changes;
  }

  async remover(avaliacao) {
    const stmt = db.prepare(`UPDATE tbl_avaliacao SET excluido_em = CURRENT_TIMESTAMP, sync_status_avaliacao = 0
      WHERE uuid_avaliacao = ?`);
    const info = stmt.run(avaliacao.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Avaliacao;