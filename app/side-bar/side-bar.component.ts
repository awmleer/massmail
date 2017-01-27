import { Component,NgZone } from '@angular/core';

// import { ObjNgFor } from './obj-ng-for.pipe';
import * as _ from "lodash";
import {MailService} from "../services/mail.service";

// const {ipcRenderer} = require('electron');


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

  constructor(
    private mailService: MailService,
    private zone:NgZone
  ){}

  // test2(){
  //   // ipcRenderer.once('get_boxes_done',this.get_boxes_done.bind(this));
  //   // ipcRenderer.send('get_boxes_start');
  //   let res=ipcRenderer.sendSync('get_boxes');
  //   _.forIn(res,(value:any,key:any)=>{
  //     let box=ipcRenderer.sendSync('open_box',key);
  //     console.log(box);
  //     this.boxes.push({
  //       name:key,
  //       count:box.messages.total
  //     });
  //   });
  // }
  getBoxes(){
    this.mailService.getBoxes().then(function(boxes:any){
      console.log(boxes);
      _.forIn(boxes,(value:any,key:any)=>{
        this.boxes.push({
          name:key,
          attr:value
        });
      });
    }.bind(this));
    //   ipcRenderer.once('get_boxes_done',function(event:any, arg:any){
    //     _.forIn(arg,(value:any,key:any)=>{
    //       ipcRenderer.once('open_box_done',function (event:any, box:any) {
    //         this.boxes.push({
    //           name:key,
    //           attr:value,
    //           count:box.messages.total
    //         });
    //         this.zone.run(()=>{});
    //       }.bind(this));
    //       ipcRenderer.send('open_box_start',key);
    //     });
    //     console.log(this.boxes);
    //   }.bind(this));
    //   ipcRenderer.send('get_boxes_start');
  }
  // console.log(this.boxes);

  // this.test_this(function(){
  //   console.log(this.boxes);
  // }.bind(this));
  // console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));


  ngOnInit(): void {
    // this.p=this.route.params[0].value.id;
    // console.log(this.route.params.value);
    // console.log(this.location);
    this.getBoxes();
  }


}
