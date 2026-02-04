import { contextBridge, ipcRenderer } from 'electron/renderer';

contextBridge.exposeInMainWorld(
    'darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle')
}
)
contextBridge.exposeInMainWorld(
    'api', {
    // USUARIOS
    listar: () => ipcRenderer.invoke('usuarios:listar'),
    buscarPorId: (uuid) => ipcRenderer.invoke("usuarios:buscarPorId", uuid),

    // SERVICOS
    listarServicos: () => ipcRenderer.invoke('servicos:listar'),
    buscarServicoPorId: (uuid) => ipcRenderer.invoke("servicos:buscarPorId", uuid),

    // AGENDAMENTOS
    listarAgendamentos: () => ipcRenderer.invoke('agendamentos:listar'),
    buscarAgendamentoPorId: (uuid) => ipcRenderer.invoke("agendamentos:buscarPorId", uuid),

    // AVALIACOES
    listarAvaliacoes: () => ipcRenderer.invoke('avaliacoes:listar'),
    buscarAvaliacaoPorId: (uuid) => ipcRenderer.invoke("avaliacoes:buscarPorId", uuid),

    // CATEGORIAS
    listarCategorias: () => ipcRenderer.invoke('categorias:listar'),
    buscarCategoriaPorId: (uuid) => ipcRenderer.invoke("categorias:buscarPorId", uuid),

    // ENDERECOS
    listarEnderecos: () => ipcRenderer.invoke('enderecos:listar'),
    buscarEnderecoPorId: (uuid) => ipcRenderer.invoke("enderecos:buscarPorId", uuid),

    // ORCAMENTOS
    listarOrcamentos: () => ipcRenderer.invoke('orcamentos:listar'),
    buscarOrcamentoPorId: (uuid) => ipcRenderer.invoke("orcamentos:buscarPorId", uuid),

    // PAGAMENTOS
    listarPagamentos: () => ipcRenderer.invoke('pagamentos:listar'),
    buscarPagamentoPorId: (uuid) => ipcRenderer.invoke("pagamentos:buscarPorId", uuid),
}
)