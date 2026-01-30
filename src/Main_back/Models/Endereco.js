import db from '../Database/db.js';
import crypto from 'node:crypto';

class Endereco {
  constructor() { }
  async adicionar(endereco) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_endereco (uuid_endereco, id_usuario, cep_endereco, rua_endereco, numero_endereco, complemento_endereco, bairro_endereco, cidade_endereco, uf_endereco, sync_status_endereco)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(
      uuid,
      endereco.id_usuario, endereco.cep_endereco, endereco.rua_endereco, endereco.numero_endereco, endereco.complemento_endereco, endereco.bairro_endereco, endereco.cidade_endereco, endereco.uf_endereco, 0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_endereco WHERE uuid_endereco = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async atualizar(enderecoAtualizado) {
    console.log('atualizar no model', enderecoAtualizado);
    const stmt = db.prepare(`UPDATE tbl_endereco 
       SET id_usuario = ?,
           cep_endereco = ?,
           rua_endereco = ?,
           numero_endereco = ?,
           complemento_endereco = ?,
           bairro_endereco = ?,
           cidade_endereco = ?,
           uf_endereco = ?,
           sync_status_endereco = 0
       WHERE uuid_endereco = ?`
    );
    const info = stmt.run(
      enderecoAtualizado.id_usuario,
      enderecoAtualizado.cep_endereco,
      enderecoAtualizado.rua_endereco,
      enderecoAtualizado.numero_endereco,
      enderecoAtualizado.complemento_endereco,
      enderecoAtualizado.bairro_endereco,
      enderecoAtualizado.cidade_endereco,
      enderecoAtualizado.uf_endereco,
      enderecoAtualizado.uuid
    );
    return info.changes;
  }

  async remover(endereco) {
    const stmt = db.prepare(`UPDATE tbl_endereco SET excluido_em = CURRENT_TIMESTAMP, sync_status_endereco = 0
      WHERE uuid_endereco = ?`);
    const info = stmt.run(endereco.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Endereco;