import { Component } from '@angular/core';

// import { ObjNgFor } from './obj-ng-for.pipe';

const {ipcRenderer} = require('electron');


@Component({
  selector: 'side-bar',
  templateUrl:'app/side-bar.component.html'
})
export class SideBarComponent  {
  boxes={};
  test(){
    ipcRenderer.once('get_boxes_done', (event:any, arg:any) => {
      console.log(arg); // prints "pong"
      console.log(event);
      this.boxes=arg;
    });
    ipcRenderer.send('get_boxes_start');
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    // this.boxes=ipcRenderer.sendSync('get_boxes');
  };
}
