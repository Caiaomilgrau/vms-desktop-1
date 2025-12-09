import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';
//                        no explore %appdata%
const dbPath = path.join(app.getPath('userData'), 'vms.db');
const db = new Database(dbPath, { verbose: console.log });

export function initDatabase() {
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS tbl_usuarios (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT, 
      nome_usuario VARCHAR(80) NOT NULL,
      email_usuario VARCHAR(115),
      senha_usuario VARCHAR(80) NOT NULL,
      telefone_usuario VARCHAR(15) NOT NULL,
      foto_usuario VARCHAR(80) NOT NULL,
      tipo_usuario VARCHAR(15) NOT NULL,
      status_usuario VARCHAR(10) NOT NULL,
      sync_status INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      atualizado_em DATETIME,
      excluido_em DATETIME -- Se estiver preenchido, o registro foi "deletado"
    );

    CREATE TABLE IF NOT EXISTS tbl_servicos (
    id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INT(11) NOT NULL,
    descricao_servico VARCHAR(150) NOT NULL,
    status_servico VARCHAR(15) NOT NULL,
    data_conclusao DATETIME,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foto_servico VARCHAR(100) NOT NULL,
    atualizado_em DATETIME,
    excluido_em DATETIME,
    )
  `);
  
  console.log('Banco de dados inicializado em:', dbPath);
}

export default db;