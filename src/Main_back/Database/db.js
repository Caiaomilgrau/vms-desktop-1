import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';

const dbPath = path.join(app.getPath('userData'), 'vms.db');
const db = new Database(dbPath, { verbose: console.log });

export function initDatabase() {
  db.pragma('journal_mode = WAL');

  db.exec(`
   CREATE TABLE IF NOT EXISTS tbl_usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_usuario TEXT,
    nome_usuario TEXT NOT NULL,
    email_usuario TEXT NOT NULL,
    senha_usuario TEXT NOT NULL,
    telefone_usuario TEXT NOT NULL,
    foto_usuario TEXT DEFAULT 'Sem Foto',
    tipo_usuario TEXT NOT NULL,
    status_usuario TEXT NOT NULL,
    sync_status_usuario INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL -- Se estiver preenchido, o registro foi "deletado"
   );

   CREATE TABLE IF NOT EXISTS tbl_categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_categoria TEXT,
    nome_categoria TEXT NOT NULL,
    descricao_categoria TEXT DEFAULT NULL,
    foto_categoria TEXT DEFAULT NULL,
    sync_status_categoria INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL
   );

   CREATE TABLE IF NOT EXISTS tbl_servico (
    id_servico INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_servico TEXT,
    id_categoria INTEGER NOT NULL,
    nome_servico TEXT NOT NULL,
    descricao_servico TEXT NOT NULL,
    data_conclusao_servico DATETIME DEFAULT NULL,
    foto_servico TEXT NOT NULL,
    sync_status_servico INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_servico_categoria FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id_categoria)
   );
    CREATE INDEX idx_servico_id_categoria ON tbl_servico(id_categoria);

    CREATE TABLE IF NOT EXISTS tbl_endereco (
    id_endereco INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_endereco TEXT,
    id_usuario INTEGER NOT NULL,
    cep_endereco TEXT NOT NULL,
    logradouro_endereco TEXT NOT NULL,
    numero_endereco TEXT NOT NULL,
    complemento_endereco TEXT DEFAULT NULL,
    bairro_endereco TEXT NOT NULL,
    cidade_endereco TEXT NOT NULL,
    uf_endereco TEXT NOT NULL,
    sync_status_endereco INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_endereco_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario)
   );

   CREATE TABLE IF NOT EXISTS tbl_orcamento (
    id_orcamento INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_orcamento TEXT,
    id_usuario INTEGER NOT NULL,
    id_servico INTEGER NOT NULL,
    id_pagamento INTEGER NOT NULL,
    valor_orcamento DECIMAL(10,2) NOT NULL,
    status_orcamento TEXT NOT NULL,
    data_orcamento DATETIME NOT NULL,
    sync_status_orcamento INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_orcamento_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    CONSTRAINT fk_orcamento_servico FOREIGN KEY (id_servico) REFERENCES tbl_servico(id_servico),
    CONSTRAINT fk_orcamento_pagamento FOREIGN KEY (id_pagamento) REFERENCES tbl_pagamento(id_pagamento)
   );

    CREATE TABLE IF NOT EXISTS tbl_pagamento (
    id_pagamento INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_pagamento TEXT,
    tipo_pagamento TEXT NOT NULL,
    sync_status_pagamento INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL
   );

   CREATE TABLE IF NOT EXISTS tbl_servico_categoria (
    id_servico INTEGER PRIMARY KEY NOT NULL,
    uuid_servico_categoria TEXT,
    id_categoria INTEGER  PRIMARY KEY NOT NULL,
    sync_status_categoria INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    CONSTRAINT fk_sc_categoria FOREIGN KEY (id_servico) REFERENCES tbl_servico(id_servico),
    CONSTRAINT fk_sc_servico FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id_categoria)
  );

    CREATE TABLE IF NOT EXISTS tbl_avaliacao (
    id_avaliacao INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_avaliacao TEXT,
    id_servico INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    nota_avaliacao INTEGER NOT NULL,
    descricao_avaliacao TEXT DEFAULT NULL,
    status_avaliacao TEXT NOT NULL,
    foto_avaliacao TEXT DEFAULT NULL,
    sync_status_avaliacao INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_avaliacao_servico FOREIGN KEY (id_servico) REFERENCES tbl_servico(id_servico),
    CONSTRAINT fk_avaliacao_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario)
   );

   CREATE TABLE IF NOT EXISTS tbl_agendamento (
    id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid_agendamento TEXT,
    id_usuario INTEGER NOT NULL,
    id_servico INTEGER NOT NULL,
    horario_agendamento TEXT NOT NULL,
    status_agendamento TEXT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    sync_status_agendamento INTEGER DEFAULT 0, -- 0 = Pendente, 1 = Sincronizado
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT NULL,
    excluido_em DATETIME DEFAULT NULL,
    CONSTRAINT fk_agendamento_usuario FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
    CONSTRAINT fk_agendamento_servico FOREIGN KEY (id_servico) REFERENCES tbl_servico(id_servico)
   );

  `);

  console.log('Banco de dados inicializado em:', dbPath);
}

export default db;