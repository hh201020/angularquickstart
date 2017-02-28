const electron = require('electron')

const { app, BrowserWindow, ipcMain: ipc, Menu } = electron

let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 893,
    height: 725,
    resizable: false
  })

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', _ => {
    mainWindow = null
  })

})
