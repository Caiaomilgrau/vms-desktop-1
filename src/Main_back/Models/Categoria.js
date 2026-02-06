import db from '../Database/db.js';
import crypto from 'node:crypto';

class Categoria {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE id_categoria = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async salvar(dados){
    const stmt = db.prepare(`INSERT INTO tbl_categoria (id_categoria, nome_categoria, descricao_categoria, foto_categoria) VALUES (?, ?, ?, ?)`);
    stmt.run(dados.id_categoria, dados.nome_categoria, dados.descricao_categoria, dados.foto_categoria);
  }
}

export default Categoria;