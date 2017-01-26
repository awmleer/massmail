import { Component,NgZone } from '@angular/core';

// import { ObjNgFor } from './obj-ng-for.pipe';
import * as _ from "lodash";

const {ipcRenderer} = require('electron');


@Component({
  selector: 'side-bar',
  templateUrl:'app/side-bar.component.html'
})
export class SideBarComponent  {
  //todo: class box
  boxes:any[]=[];
  get_boxes_done(event:any, arg:any){
    console.log(this.boxes);
    _.forIn(arg,(value:any,key:any)=>{
        this.boxes.push({
          name:key,
          attr:value
        });
    });
  }
  constructor(private zone:NgZone){
    this.ngZone=zone;
  }
  ngZone:NgZone;
  test(){
    // ipcRenderer.once('get_boxes_done',this.get_boxes_done.bind(this));
    // todo fix: view updating in callback function
    // ipcRenderer.send('get_boxes_start');
    let res=ipcRenderer.sendSync('get_boxes');
    _.forIn(res,(value:any,key:any)=>{
      
      this.boxes.push({
        name:key,
        attr:value
      });
    });
  }

    // console.log(this.boxes);

    // this.test_this(function(){
    //   console.log(this.boxes);
    // }.bind(this));
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
}
