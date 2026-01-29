import db from '../Database/db.js';
import crypto from 'node:crypto'; 

class Agendamento {
    constructor(){}
    async adicionar(agendamento) {
        const uuid = crypto.randomUUID();
        const stmt = db.prepare(`INSERT INTO tbl_agendamento (uuid, id_usuario, id_servico, horario_agendamento, status_agendamento, data_agendamento)
             VALUES (?, ?, ?, ?, ?, ?, ?)`);
             const info = stmt.run(
                uuid,
                agendamento.id_usuario, agendamento.id_servico, agendamento.horario_agendamento, agendamento.status_agendamento, agendamento.data_agendamento
             );
             return info.lastInsertRowid;
}
async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_agendamento WHERE excluido_em IS NULL`);
    return stmt.all();
  }


} export default Agendamento;