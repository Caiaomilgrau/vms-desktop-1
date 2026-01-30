import db from '../Database/db.js';
import crypto from 'node:crypto';

class Agendamento {
  constructor() { }
  async adicionar(agendamento) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_agendamento (uuid_agendamento, id_usuario, id_servico, horario_agendamento, status_agendamento, data_agendamento, sync_status_agendamento)
             VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(
      uuid,
      agendamento.id_usuario, agendamento.id_servico, agendamento.horario_agendamento, agendamento.status_agendamento, agendamento.data_agendamento, 0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_agendamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_agendamento WHERE uuid_agendamento = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async atualizar(agendamentoAtualizado) {
    console.log('atualizar no model', agendamentoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_agendamento 
       SET id_usuario = ?,
           id_servico = ?,
           horario_agendamento = ?,
           status_agendamento = ?,
           data_agendamento = ?,
           sync_status_agendamento = 0
       WHERE uuid_agendamento = ?`
    );
    const info = stmt.run(
      agendamentoAtualizado.id_usuario,
      agendamentoAtualizado.id_servico,
      agendamentoAtualizado.horario_agendamento,
      agendamentoAtualizado.status_agendamento,
      agendamentoAtualizado.data_agendamento,
      agendamentoAtualizado.uuid
    );
    return info.changes;
  }

  async remover(agendamento) {
    const stmt = db.prepare(`UPDATE tbl_agendamento SET excluido_em = CURRENT_TIMESTAMP, sync_status_agendamento = 0
      WHERE uuid_agendamento = ?`);
    const info = stmt.run(agendamento.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Agendamento;