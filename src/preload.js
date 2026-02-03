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
    cadastrar: (usuario) => ipcRenderer.invoke('usuarios:cadastrar', usuario),
    buscarPorId: (uuid) => ipcRenderer.invoke("usuarios:buscarPorId", uuid),
    editarUsuario: (usuario) => ipcRenderer.invoke("usuarios:editar", usuario),
    removerUsuario: (uuid) => ipcRenderer.invoke("usuarios:removerUsuario", uuid),

    // SERVICOS
    listarServicos: () => ipcRenderer.invoke('servicos:listar'),
    cadastrarServico: (servico) => ipcRenderer.invoke('servicos:cadastrar', servico),
    buscarServicoPorId: (uuid) => ipcRenderer.invoke("servicos:buscarPorId", uuid),
    editarServico: (servico) => ipcRenderer.invoke("servicos:editar", servico),
    removerServico: (uuid) => ipcRenderer.invoke("servicos:remover", uuid),

    // AGENDAMENTOS
    listarAgendamentos: () => ipcRenderer.invoke('agendamentos:listar'),
    cadastrarAgendamento: (dados) => ipcRenderer.invoke('agendamentos:cadastrar', dados),
    buscarAgendamentoPorId: (uuid) => ipcRenderer.invoke("agendamentos:buscarPorId", uuid),
    editarAgendamento: (dados) => ipcRenderer.invoke("agendamentos:editar", dados),
    removerAgendamento: (uuid) => ipcRenderer.invoke("agendamentos:remover", uuid),

    // AVALIACOES
    listarAvaliacoes: () => ipcRenderer.invoke('avaliacoes:listar'),
    cadastrarAvaliacao: (dados) => ipcRenderer.invoke('avaliacoes:cadastrar', dados),
    buscarAvaliacaoPorId: (uuid) => ipcRenderer.invoke("avaliacoes:buscarPorId", uuid),
    editarAvaliacao: (dados) => ipcRenderer.invoke("avaliacoes:editar", dados),
    removerAvaliacao: (uuid) => ipcRenderer.invoke("avaliacoes:remover", uuid),

    // CATEGORIAS
    listarCategorias: () => ipcRenderer.invoke('categorias:listar'),
    cadastrarCategoria: (dados) => ipcRenderer.invoke('categorias:cadastrar', dados),
    buscarCategoriaPorId: (uuid) => ipcRenderer.invoke("categorias:buscarPorId", uuid),
    editarCategoria: (dados) => ipcRenderer.invoke("categorias:editar", dados),
    removerCategoria: (uuid) => ipcRenderer.invoke("categorias:remover", uuid),

    // ENDERECOS
    listarEnderecos: () => ipcRenderer.invoke('enderecos:listar'),
    cadastrarEndereco: (dados) => ipcRenderer.invoke('enderecos:cadastrar', dados),
    buscarEnderecoPorId: (uuid) => ipcRenderer.invoke("enderecos:buscarPorId", uuid),
    editarEndereco: (dados) => ipcRenderer.invoke("enderecos:editar", dados),
    removerEndereco: (uuid) => ipcRenderer.invoke("enderecos:remover", uuid),

    // ORCAMENTOS
    listarOrcamentos: () => ipcRenderer.invoke('orcamentos:listar'),
    cadastrarOrcamento: (dados) => ipcRenderer.invoke('orcamentos:cadastrar', dados),
    buscarOrcamentoPorId: (uuid) => ipcRenderer.invoke("orcamentos:buscarPorId", uuid),
    editarOrcamento: (dados) => ipcRenderer.invoke("orcamentos:editar", dados),
    removerOrcamento: (uuid) => ipcRenderer.invoke("orcamentos:remover", uuid),

    // PAGAMENTOS
    listarPagamentos: () => ipcRenderer.invoke('pagamentos:listar'),
    cadastrarPagamento: (dados) => ipcRenderer.invoke('pagamentos:cadastrar', dados),
    buscarPagamentoPorId: (uuid) => ipcRenderer.invoke("pagamentos:buscarPorId", uuid),
    editarPagamento: (dados) => ipcRenderer.invoke("pagamentos:editar", dados),
    removerPagamento: (uuid) => ipcRenderer.invoke("pagamentos:remover", uuid),

}
)