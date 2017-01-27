import { Component,NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

const {ipcRenderer} = require('electron');

import { MailAbbreviated } from '../classes/mail-abbreviated'

@Component({
  selector: 'mail-card-list',
  templateUrl:'app/mail-card-list/mail-card-list.component.html'
})

export class MailCardListComponent  {
  name='Angular';
  box_name:string;
  mails:Array<MailAbbreviated>;

  constructor(
    // private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private zone: NgZone
  ) {}

  fetch():void{
    // ipcRenderer.once('fetch_all_done',function (event:any,arg:any) {
    //   console.log(this.mails);
    //   this.mails=arg.payload;
    //   console.log(this.mails);
    //   this.zone.run(() => {});
    // }.bind(this));
    // ipcRenderer.send('fetch_all_start',this.box_name);
  }

  ngOnInit(): void {
    // this.p=this.route.params[0].value.id;
    // console.log(this.route.params.value);
    // console.log(this.location);
    this.route.params.subscribe(function(params:Params){
      this.box_name = params['box_name'];
      this.fetch();
    }.bind(this));
  }

}
