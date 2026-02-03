import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import UsuarioController from './Main_back/Controllers/UsuarioController.js';
import ServicoController from './Main_back/Controllers/ServicoController.js';
import AgendamentoController from './Main_back/Controllers/AgendamentoController.js';
import AvaliacaoController from './Main_back/Controllers/AvaliacaoController.js';
import CategoriaController from './Main_back/Controllers/CategoriaController.js';
import EnderecoController from './Main_back/Controllers/EnderecoController.js';
import OrcamentoController from './Main_back/Controllers/OrcamentoController.js';
import PagamentoController from './Main_back/Controllers/PagamentoController.js';
import { initDatabase } from './Main_back/Database/db.js';
import SyncService from './Main_back/Services/SyncService.js';
import { net } from 'electron';

if (started) {
  app.quit();
}
const controlerUsuario = new UsuarioController();
const controlerServico = new ServicoController();
const controlerAgendamento = new AgendamentoController();
const controlerAvaliacao = new AvaliacaoController();
const controlerCategoria = new CategoriaController();
const controlerEndereco = new EnderecoController();
const controlerOrcamento = new OrcamentoController();
const controlerPagamento = new PagamentoController();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    transparent: false,
    alwaysOnTop: false,
    resizable: true,
    fullscreen: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const registrarHandlers = () => {
  // USUARIOS
  ipcMain.handle("usuarios:listar", async () => await controlerUsuario.listar());
  ipcMain.handle("usuarios:cadastrar", async (event, dados) => await controlerUsuario.cadastrar(dados));
  ipcMain.handle("usuarios:buscarPorId", async (event, uuid) => await controlerUsuario.buscarPorId(uuid));
  ipcMain.handle("usuarios:editar", async (event, dados) => await controlerUsuario.atualizarUsuario(dados));
  ipcMain.handle("usuarios:removerUsuario", async (event, uuid) => await controlerUsuario.removerUsuario(uuid));

  // SERVICOS
  ipcMain.handle("servicos:listar", async () => await controlerServico.listar());
  ipcMain.handle("servicos:cadastrar", async (event, dados) => await controlerServico.cadastrar(dados));
  ipcMain.handle("servicos:buscarPorId", async (event, uuid) => await controlerServico.buscarPorId(uuid));
  ipcMain.handle("servicos:editar", async (event, dados) => await controlerServico.atualizar(dados));
  ipcMain.handle("servicos:remover", async (event, uuid) => await controlerServico.remover(uuid));

  // AGENDAMENTOS
  ipcMain.handle("agendamentos:listar", async () => await controlerAgendamento.listar());
  ipcMain.handle("agendamentos:cadastrar", async (event, dados) => await controlerAgendamento.cadastrar(dados));
  ipcMain.handle("agendamentos:buscarPorId", async (event, uuid) => await controlerAgendamento.buscarPorId(uuid));
  ipcMain.handle("agendamentos:editar", async (event, dados) => await controlerAgendamento.atualizar(dados));
  ipcMain.handle("agendamentos:remover", async (event, uuid) => await controlerAgendamento.remover(uuid));

  // AVALIACOES
  ipcMain.handle("avaliacoes:listar", async () => await controlerAvaliacao.listar());
  ipcMain.handle("avaliacoes:cadastrar", async (event, dados) => await controlerAvaliacao.cadastrar(dados));
  ipcMain.handle("avaliacoes:buscarPorId", async (event, uuid) => await controlerAvaliacao.buscarPorId(uuid));
  ipcMain.handle("avaliacoes:editar", async (event, dados) => await controlerAvaliacao.atualizar(dados));
  ipcMain.handle("avaliacoes:remover", async (event, uuid) => await controlerAvaliacao.remover(uuid));

  // CATEGORIAS
  ipcMain.handle("categorias:listar", async () => await controlerCategoria.listar());
  ipcMain.handle("categorias:cadastrar", async (event, dados) => await controlerCategoria.cadastrar(dados));
  ipcMain.handle("categorias:buscarPorId", async (event, uuid) => await controlerCategoria.buscarPorId(uuid));
  ipcMain.handle("categorias:editar", async (event, dados) => await controlerCategoria.atualizar(dados));
  ipcMain.handle("categorias:remover", async (event, uuid) => await controlerCategoria.remover(uuid));

  // ENDERECOS
  ipcMain.handle("enderecos:listar", async () => await controlerEndereco.listar());
  ipcMain.handle("enderecos:cadastrar", async (event, dados) => await controlerEndereco.cadastrar(dados));
  ipcMain.handle("enderecos:buscarPorId", async (event, uuid) => await controlerEndereco.buscarPorId(uuid));
  ipcMain.handle("enderecos:editar", async (event, dados) => await controlerEndereco.atualizar(dados));
  ipcMain.handle("enderecos:remover", async (event, uuid) => await controlerEndereco.remover(uuid));

  // ORCAMENTOS
  ipcMain.handle("orcamentos:listar", async () => await controlerOrcamento.listar());
  ipcMain.handle("orcamentos:cadastrar", async (event, dados) => await controlerOrcamento.cadastrar(dados));
  ipcMain.handle("orcamentos:buscarPorId", async (event, uuid) => await controlerOrcamento.buscarPorId(uuid));
  ipcMain.handle("orcamentos:editar", async (event, dados) => await controlerOrcamento.atualizar(dados));
  ipcMain.handle("orcamentos:remover", async (event, uuid) => await controlerOrcamento.remover(uuid));

  // PAGAMENTOS
  ipcMain.handle("pagamentos:listar", async () => await controlerPagamento.listar());
  ipcMain.handle("pagamentos:cadastrar", async (event, dados) => await controlerPagamento.cadastrar(dados));
  ipcMain.handle("pagamentos:buscarPorId", async (event, uuid) => await controlerPagamento.buscarPorId(uuid));
  ipcMain.handle("pagamentos:editar", async (event, dados) => await controlerPagamento.atualizar(dados));
  ipcMain.handle("pagamentos:remover", async (event, uuid) => await controlerPagamento.remover(uuid));


  async function sincronizarSeOnline() {
    const isOnline = net.isOnline();
    if (isOnline) {
      console.log('[Main] Aplicativo iniciado com internet. Iniciando sincronização automática...');
      const dados = await SyncService.sincronizar('usuarios');
      await controlerUsuario.cadastrarLocalmente(dados)
    }
  }
  sincronizarSeOnline();

  const INTERVALO_SYNC = 1000 * 60 * 1; // 1 minuto

  const syncInterval = setInterval(async () => {
    console.log('[Main] Ciclo de auto-sync iniciado...');
    await SyncService.enviarDadosLocais('usuariosalvar');
    await SyncService.sincronizar();
  }, INTERVALO_SYNC);

  app.on('before-quit', () => {
    clearInterval(syncInterval);
  });



  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  });
};

app.whenReady().then(() => {
  registrarHandlers(); // Register handlers BEFORE creating window
  createWindow();
  initDatabase();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
