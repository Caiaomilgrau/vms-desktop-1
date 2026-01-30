import db from '../Database/db.js';
import crypto from 'node:crypto';

class Categoria {
  constructor() { }
  async adicionar(categoria) {
    const uuid = crypto.randomUUID();
    const stmt = db.prepare(`INSERT INTO tbl_categoria (uuid_categoria, nome_categoria, descricao_categoria, foto_categoria, sync_status_categoria)
             VALUES (?, ?, ?, ?, ?)`);
    const info = stmt.run(
      uuid,
      categoria.nome_categoria, categoria.descricao_categoria, categoria.foto_categoria, 0
    );
    return info.lastInsertRowid;
  }
  async listar() {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE excluido_em IS NULL`);
    return stmt.all();
  }

  async buscarPorId(id) {
    const stmt = db.prepare(`SELECT * FROM tbl_categoria WHERE uuid_categoria = ? AND excluido_em IS NULL`);
    return stmt.get(id);
  }

  async atualizar(categoriaAtualizada) {
    console.log('atualizar no model', categoriaAtualizada);
    const stmt = db.prepare(`UPDATE tbl_categoria 
       SET nome_categoria = ?,
           descricao_categoria = ?,
           foto_categoria = ?,
           sync_status_categoria = 0
       WHERE uuid_categoria = ?`
    );
    const info = stmt.run(
      categoriaAtualizada.nome_categoria,
      categoriaAtualizada.descricao_categoria,
      categoriaAtualizada.foto_categoria,
      categoriaAtualizada.uuid
    );
    return info.changes;
  }

  async remover(categoria) {
    const stmt = db.prepare(`UPDATE tbl_categoria SET excluido_em = CURRENT_TIMESTAMP, sync_status_categoria = 0
      WHERE uuid_categoria = ?`);
    const info = stmt.run(categoria.uuid);
    //ternario
    return info.changes > 0 ? true : false;
  }


} export default Categoria;