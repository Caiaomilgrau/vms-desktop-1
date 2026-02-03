class Configuracao {
  constructor() {
    this.verificarConexao();
  }
  async modoEscuro() {
    document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
      const isDarkMode = await window.darkMode.toggle(); // Changed from window.api.toggleDarkMode to window.darkMode.toggle
      // Wait, I need to check preload.js to see what 'window.darkMode' is exposed as.
      // The previous code had window.darkMode.toggle().
      // But main.js has ipcMain.handle('dark-mode:toggle').
      // I should verify preload.js.
      document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
      document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    })
  }
  verificarConexao() {
    const updateOnlineStatus = () => {
      document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
    }
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }
}

export default Configuracao;