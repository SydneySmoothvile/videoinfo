const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
//const path = require('path')

const {app , BrowserWindow , ipcMain} = electron;

app.on('ready' , () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      //nodeIntegration: true
      // preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    }
  });

  //mainWindow.loadURL("https//:www.google.com");
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('videosubmit' , ( event , path)=> {
  ffmpeg.ffprobe( path ,(err , metadata) => {
    console.log('Video duration is :' , metadata.format.duration);
  });
});
