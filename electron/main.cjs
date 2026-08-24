// Envoltorio de escritorio (Windows, macOS y Linux).
// Instala Electron sólo si quieres la versión de escritorio:
//    npm i -D electron
// y luego:  npm run desktop
const { app, BrowserWindow } = require('electron')
const path = require('path')

function crearVentana () {
  const win = new BrowserWindow({
    width: 1180, height: 820, minWidth: 640, minHeight: 520,
    backgroundColor: '#fff8ec',
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  })
  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
}

app.whenReady().then(() => {
  crearVentana()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) crearVentana() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
