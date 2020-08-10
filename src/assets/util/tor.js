const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

export function dormant () {
  ipcRenderer.send('dormant34')
}

export function circuitEstablished () {
  ipcRenderer.send('circuitEstablished34')
}
