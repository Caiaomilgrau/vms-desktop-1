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

    // AVALIACOES
    listarAvaliacoes: () => ipcRenderer.invoke('avaliacoes:listar'),
    buscarAvaliacaoPorId: (uuid) => ipcRenderer.invoke("avaliacoes:buscarPorId", uuid),

    // CATEGORIAS
    listarCategorias: () => ipcRenderer.invoke('categorias:listar'),
    buscarCategoriaPorId: (uuid) => ipcRenderer.invoke("categorias:buscarPorId", uuid),

    // ENDERECOS
    listarEnderecos: () => ipcRenderer.invoke('enderecos:listar'),
    buscarEnderecoPorId: (uuid) => ipcRenderer.invoke("enderecos:buscarPorId", uuid),

    }
)