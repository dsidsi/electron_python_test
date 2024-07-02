const { app, BrowserWindow } = require('electron/main')
let win = null

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // 官网似乎说是默认false，但是这里必须设置contextIsolation
      contextIsolation: false
		}
  })

  console.log("qidong?")
  win.loadFile('index.html')
  
  runPythonScript();
}

function runPythonScript() {
  console.log("qidongPython?")
  const { app, BrowserWindow, ipcMain } = require('electron');
  const { spawn } = require('child_process');
  const path = require('path');
    const pythonProcess = spawn('python', [path.join(__dirname, 'hello.py')]);

  pythonProcess.stdout.on('data', (data) => {
    
    // 这里可以把数据发送到渲染进程
    //win.webContents.send('python-data', data.toString());
    ipcMain.on('require-python-data', (ev, msg_data) => {
      console.log(`Python stdout: ${data}`);
      // win.webContents.send('msg_main2render', param1, param2);
      ev.sender.send('python-data', data.toString());
    });
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