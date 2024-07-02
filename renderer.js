// renderer.js

console.log('rendered started');

let { ipcRenderer } = require("electron")

ipcRenderer.send('require-python-data', 'require python data')

//监听来自主进程的数据
ipcRenderer.on('python-data', (event, data) => {
  console.log('Received data from Python:', data);
  document.getElementById('output').innerText = data;
});

// require('electron').ipcRenderer.on('python-data', (event, message) => {
//   console.log('Received data');
//   console.log('Received data from Python:', message);
//   console.log(message) // Prints 'whoooooooh!'，这里的message是object类型
// })
