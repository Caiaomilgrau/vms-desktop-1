import db from '../Database/db.js';
import crypto from 'node:crypto';

class Endereco {
  constructor() { }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE id_endereco = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async salvar(dados){
    const stmt = db.prepare(`INSERT INTO tbl_endereco (id_endereco, id_usuario, cep_endereco, logradouro_endereco, numero_endereco, complemento_endereco, bairro_endereco, cidade_endereco, uf_endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.run(dados.id_endereco, dados.id_usuario, dados.cep_endereco, dados.logradouro_endereco, dados.numero_endereco, dados.complemento_endereco, dados.bairro_endereco, dados.cidade_endereco, dados.uf_endereco);
  }
}

export default Endereco;