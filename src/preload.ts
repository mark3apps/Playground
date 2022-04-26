// const ipc = require('electron').ipcRenderer
// const remote = require('electron').remote

import electron from 'electron'
const ipc = electron.ipcRenderer

window.addEventListener('DOMContentLoaded', () => {
    const minimize = document.getElementById('minimize-button')
    minimize?.addEventListener('click', function () {
        ipc.send('minimize-window')
    })

    const maximize = document.getElementById('maximize-button')
    maximize?.addEventListener('click', function () {
        ipc.send('toggle-maximize-window')
    })

    const close = document.getElementById('close-button')
    close?.addEventListener('click', function () {
        ipc.send('close')
    })
})
