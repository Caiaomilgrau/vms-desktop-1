import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';

const dbPath = path.join(app.getPath('assets'), 'vms.db');
const db = new Database(dbPath, { verbose: console.log });

export function initDatabase() {
  db.pragma('journal_mode = WAL');

  db.exec(`
   CREATE TABLE IF NOT EXISTS tbl_usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_usuario TEXT,
    nome_usuario TEXT NOT NULL,
    email_usuario TEXT NOT NULL UNIQUE,
    senha_usuario TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL,
    sync_status_usuario INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL CURRENT_TIMESTAMP,
    excluido_em DATETIME DEFAULT NULL -- Se estiver preenchido, o registro foi "deletado"
   );

   CREATE TABLE IF NOT EXISTS tbl_categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_categoria TEXT NOT NULL,
    descricao_categoria TEXT DEFAULT NULL,
    foto_categoria TEXT DEFAULT NULL,
    criado_em DATETIME DEFAULT NULL,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL
   );

   CREATE TABLE IF NOT EXISTS tbl_servico (
    id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_servico TEXT,
    id_categoria INTEGER NOT NULL,
    nome_servico TEXT NOT NULL,
    descricao_servico TEXT NOT NULL,
    valor_base_servico NUMERIC(10,2) NOT NULL,
    foto_servico TEXT NOT NULL,
    sync_status_servico TEXT NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_servico_categoria FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id_categoria)
   );
    CREATE INDEX idx_servico_id_categoria ON tbl_servico(id_categoria);
  `);
  
  console.log('Banco de dados inicializado em:', dbPath);
}

export default db;