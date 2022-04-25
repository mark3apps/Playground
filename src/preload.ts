// const ipc = require('electron').ipcRenderer
// const remote = require('electron').remote

import electron, { app } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
    const electron = require('electron')
    const ipc = electron.ipcRenderer

    const element = document.getElementById('close-button')

    element?.addEventListener('click', function () {
        ipc.send('toggle-maximize-window')
    })

    // if (element) element.innerText = 'testing'
})
