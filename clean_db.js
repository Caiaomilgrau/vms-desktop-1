const Database = require('better-sqlite3');
const path = require('node:path');

const dbPath = path.join(process.env.APPDATA, 'vms-desktop-1', 'vms.db');
const db = new Database(dbPath, { verbose: console.log });

console.log('Limpando colunas sync_status do banco de dados em:', dbPath);

const tables = [
    { name: 'tbl_usuario', col: 'sync_status_usuario' },
    { name: 'tbl_categoria', col: 'sync_status_categoria' },
    { name: 'tbl_servico', col: 'sync_status_servico' },
    { name: 'tbl_endereco', col: 'sync_status_endereco' },
    { name: 'tbl_orcamento', col: 'sync_status_orcamento' },
    { name: 'tbl_pagamento', col: 'sync_status_pagamento' },
    { name: 'tbl_servico_categoria', col: 'sync_status_categoria' },
    { name: 'tbl_avaliacao', col: 'sync_status_avaliacao' },
    { name: 'tbl_agendamento', col: 'sync_status_agendamento' }
];

function migrate() {
    for (const table of tables) {
        try {
            console.log(`Removendo ${table.col} de ${table.name}...`);
            db.exec(`ALTER TABLE ${table.name} DROP COLUMN ${table.col}`);
            console.log(`Sucesso!`);
        } catch (error) {
            if (error.message.includes('no such column')) {
                console.log(`Coluna já não existia em ${table.name}.`);
            } else if (error.message.includes('syntax error')) {
                console.log(`Erro de sintaxe (provavelmente versão antiga do SQLite). Pulando...`);
            } else {
                console.error(`Erro ao processar ${table.name}:`, error.message);
            }
        }
    }
}

migrate();
db.close();
console.log('Processo finalizado.');
