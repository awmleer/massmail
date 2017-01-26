import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {SideBarComponent} from "./side-bar.component";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent , SideBarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
