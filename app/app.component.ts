import { Component } from '@angular/core';

// import { ipc } from '../ipc';
const {ipcRenderer} = require('electron');
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"




@Component({
  selector: 'my-app',
  templateUrl:'app/app.component.html'
  // template: ``,
})
export class AppComponent  {
  name = 'Angular';
  test(){
    // console.log(ipc);
    // ipcRenderer.once('asynchronous-reply', (event:any, arg:any) => {
    //   console.log(arg); // prints "pong"
      // console.log(event);
    // });
    // ipcRenderer.send('asynchronous-message', 'ping');
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    console.log(ipcRenderer.sendSync('get_boxes'));
  };

}
