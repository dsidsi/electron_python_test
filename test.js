var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
let { ipcMain } = require('electron');

var win = null;
app.on("ready", ()=>{
    win = new BrowserWindow({
        "webPreferences": {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile("index.html");
    ipcMain.on('msg_render2main', (event, param1, param2) => {
        // win.webContents.send('msg_main2render', param1, param2);
        event.reply('msg_main2render', param1, param2);
    });
    win.on('close', ()=>{
        win=null;
    });
});
app.on('window-all-closed', ()=>{
    app.quit();
});

