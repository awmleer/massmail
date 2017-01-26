import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {SideBarComponent} from "./side-bar.component";
import {ObjNgFor} from "./obj-ng-for.pipe";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [AppComponent,SideBarComponent,ObjNgFor],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
