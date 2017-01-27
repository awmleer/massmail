import { Component,NgZone } from '@angular/core';

// import { ObjNgFor } from './obj-ng-for.pipe';
import * as _ from "lodash";
import {bindOutputs} from "@angular/compiler/src/view_compiler/event_binder";

const {ipcRenderer} = require('electron');


@Component({
  selector: 'side-bar',
  templateUrl:'app/side-bar/side-bar.component.html'
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
  test2(){
    // ipcRenderer.once('get_boxes_done',this.get_boxes_done.bind(this));
    // todo fix: view updating in callback function
    // ipcRenderer.send('get_boxes_start');
    let res=ipcRenderer.sendSync('get_boxes');
    _.forIn(res,(value:any,key:any)=>{
      let box=ipcRenderer.sendSync('open_box',key);
      console.log(box);
      this.boxes.push({
        name:key,
        count:box.messages.total
      });
    });
  }
  test(){
    ipcRenderer.once('fetch_all_done',function (event:any,arg:any) {
      console.log(arg);
    });
    ipcRenderer.send('fetch_all_start','INBOX');
    // ipcRenderer.sendSync('open_box','INBOX');
    // ipcRenderer.sendSync('search');
  }

  test_text='hahaha';

    // console.log(this.boxes);

    // this.test_this(function(){
    //   console.log(this.boxes);
    // }.bind(this));
    // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
}
