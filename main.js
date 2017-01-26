const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// In main process.
const {ipcMain} = require('electron');
var Imap = require('imap'),
  inspect = require('util').inspect;
var fs = require('fs')

var imap = new Imap({
  user: 'zmk6d9mtb@sina.com',
  password: '#3kLjPe9cr',
  host: 'imap.sina.com',
  port: 993,
  tls: true
});

// imap.once('ready', function() {
//   openInbox(function(err, box) {
//     if (err) throw err;
//     var f = imap.seq.fetch('1:3', {
//       bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//       struct: true
//     });
//     f.on('message', function(msg, seqno) {
//       console.log('Message #%d', seqno);
//       var prefix = '(#' + seqno + ') ';
//       msg.on('body', function(stream, info) {
//         var buffer = '';
//         stream.on('data', function(chunk) {
//           buffer += chunk.toString('utf8');
//         });
//         stream.once('end', function() {
//           console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
//         });
//       });
//       msg.once('attributes', function(attrs) {
//         console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//       });
//       msg.once('end', function() {
//         console.log(prefix + 'Finished');
//       });
//     });
//     f.once('error', function(err) {
//       console.log('Fetch error: ' + err);
//     });
//     f.once('end', function() {
//       console.log('Done fetching all messages!');
//       // imap.end();
//     });
//   });
// });

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();

ipcMain.on('get_boxes_start', (event, arg) => {
  console.log(arg);  // prints "ping"
  imap.getBoxes(function (err,boxes) {
    console.log(boxes);
    res=boxes;
    // event.returnValue=res;
    event.sender.send('get_boxes_done', res);
  });
});

ipcMain.on('get_boxes',(event,arg)=>{
  imap.getBoxes(function (err,boxes) {
    console.log(boxes);
    event.returnValue=boxes;
  });
});

ipcMain.on('open_box',(event,arg)=>{
  imap.openBox(arg,function (err,box) {
    console.log(box);
    event.returnValue=box;
  });
});

ipcMain.on('search',(event,arg)=>{
  imap.search([ 'ALL' ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results, { bodies: ['HEADER'] });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        // console.log(stream.read());
        let body='';
        // stream.on('readable',function(buffer){
        //   body += buffer.read().toString();
        // });
        stream.on('data', function(chunk) {
          body += chunk.toString('utf8');
        });
        stream.on('end',function(){
          console.log('#'+seqno+' final output \n');
          console.log(Imap.parseHeader(body));
        });
        // stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
      event.returnValue=0;
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      event.returnValue=0;
    });
  });
});


ipcMain.on('open_box_start',(event,arg)=>{
  imap.openBox('INBOX', true, (err,box)=>{
    //todo: if err
    event.sender.send('open_box_done', box);
  });
});
