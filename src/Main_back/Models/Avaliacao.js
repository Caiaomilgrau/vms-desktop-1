import db from '../Database/db.js';
import crypto from 'node:crypto';

class Avaliacao {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE excluido_em IS NULL`);
    return stmt.all();
  }


  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_avaliacao WHERE id_avaliacao = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async salvar(dados){
    const stmt = db.prepare(`INSERT INTO tbl_avaliacao (id_avaliacao, id_servico, id_usuario, nota_avaliacao, descricao_avaliacao, status_avaliacao, foto_avaliacao) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(dados.id_avaliacao, dados.id_servico, dados.id_usuario, dados.nota_avaliacao, dados.descricao_avaliacao, dados.status_avaliacao, dados.foto_avaliacao);
  }


}

export default Avaliacao;