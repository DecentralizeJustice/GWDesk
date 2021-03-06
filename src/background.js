'use strict'
import path from 'path'
import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const contextMenu = require('electron-context-menu')
const log = require('electron-log')
const isDevelopment = process.env.NODE_ENV !== 'production'
const { autoUpdater } = require('electron-updater')
const kill = require('tree-kill')
const find = require('find-process')
autoUpdater.autoDownload = false
const { ipcMain } = require('electron')
const os = require('os')
let port

function setPort (portNumber) {
  log.warn('portSet', portNumber)
  if (!isDevelopment) {
    win.webContents.session.setProxy({ proxyRules: 'socks5://127.0.0.1:' + portNumber })
  }
}

const granax = require('@deadcanaries/granax')
let tor
try {
  tor = granax()
} catch (err) {
  log.error(err)
}

try {
  tor.on('ready', function () {
    tor.getInfo('net/listeners/socks', (err, result) => {
      const port = parseInt(result.split('"').join('').split(':')[1])
      setPort(port)
      log.warn('port set:', port)
      if (err) {
        log.warn(err)
      }
    })
  })
} catch (err) {
  log.error(err)
}

tor.on('error', function (err) {
  log.error(err)
})
ipcMain.on('circuitEstablished34', event => {
  try {
    tor.getInfo('status/circuit-established', (err, result) => {
      win.webContents.send('circuitEstablished34', { circuitEstablished: result })
      if (err) {
        throw (err)
      }
    })
  } catch (e) {
    log.error(e)
  }
})
ipcMain.on('dormant34', event => {
  try {
    tor.getInfo('dormant', (err, result) => {
      win.webContents.send('dormant34', { dormant: result })
      if (err) {
        throw (err)
      }
    })
  } catch (e) {
    log.error(e)
  }
})
contextMenu({
  showSearchWithGoogle: false,
  showLookUpSelection: false,
  prepend: (defaultActions, params, browserWindow) => [
  ]
})
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow(
    {
      width: 1500,
      height: 1000,
      icon: path.join(__static, 'icon.png'), // eslint-disable-line
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true, // process.env.ELECTRON_NODE_INTEGRATION,
        webSecurity: false,
        spellcheck: false,
        allowRunningInsecureContent: false
      }
    })
  if (port) {
    setPort(port)
  }
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
  win.webContents.on('will-navigate', function (event, url) {
    console.log('no navigation Allowed')
  })
  win.webContents.on('new-window', function (event, url) {
    console.log('no new Windows Allowed')
    event.preventDefault()
  })
}
app.on('quit', () => {
  hardStopDeamon()
})
app.on('will-quit', () => {
  hardStopDeamon()
})
async function hardStopDeamon () {
  const platform = os.platform()
  let processName
  if (platform === 'darwin') {
    processName = 'macElectrumGW'
  } else {
    processName = 'windowsElectrum'
  }
  const pidList = await find('name', processName, true)
  for (var i = 0; i < pidList.length; i++) {
    const pid = pidList[i].pid
    await kill(pid)
  }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})
autoUpdater.on('update-downloaded', (ev, info) => {
  autoUpdater.quitAndInstall(true, true)
})
ipcMain.on('CHECK_FOR_UPDATE_PENDING', event => {
  const { sender } = event

  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.autoDownload = false
    const result = autoUpdater.checkForUpdates()
    result
      .then((checkResult) => {
        const { updateInfo } = checkResult
        sender.send('CHECK_FOR_UPDATE_SUCCESS', updateInfo)
      })
      .catch((err) => {
        sender.send('CHECK_FOR_UPDATE_FAILURE', err)
      })
  }
})

ipcMain.on('DOWNLOAD_UPDATE_PENDING', event => {
  const result = autoUpdater.downloadUpdate()
  const { sender } = event
  result
    .then(() => {
      sender.send('DOWNLOAD_UPDATE_SUCCESS')
    })
    .catch((err) => {
      sender.send('DOWNLOAD_UPDATE_FAILURE', err)
    })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  hardStopDeamon()
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
