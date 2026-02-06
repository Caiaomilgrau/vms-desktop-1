import db from '../Database/db.js';
import crypto from 'node:crypto';


class Servicos {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_servico WHERE excluido_em IS NULL`);
    return stmt.all();  
  }
  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_servico WHERE id_servico = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }
  async salvar(dados){
    const stmt = db.prepare(`INSERT INTO tbl_servico (id_servico, id_usuario, descricao_servico, data_conclusao, foto_servico, status_servico) VALUES (?, ?, ?, ?, ?, ?)`);
    stmt.run(dados.id_servico, dados.id_usuario, dados.descricao_servico, dados.data_conclusao, dados.foto_servico, dados.status_servico);
  }
}
export default Servicos;