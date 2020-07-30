const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export function dormant () {
  ipcRenderer.send('dormant')
}

export function circuitEstablished () {
  ipcRenderer.send('circuitEstablished')
}
