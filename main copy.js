const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
			nodeIntegration: true // 改为true 即可
		}
  })

  const { ipcRenderer } = require('electron');
  win.ipcRenderer = ipcRenderer;

  console.log("qidong?")
  win.loadFile('index.html')
  
  runPythonScript(win);
}

function runPythonScript(win) {
  console.log("qidongPython?")
  const { app, BrowserWindow, ipcMain } = require('electron');
  const { spawn } = require('child_process');
  const path = require('path');
    const pythonProcess = spawn('python', [path.join(__dirname, 'hello.py')]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
    // 这里可以把数据发送到渲染进程
    win.webContents.send('python-data', data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//2.用flutter实现调用python脚本
//3.用go写一个简单的http服务，把http服务输出到ui界面上，ui界面用electron
//4.