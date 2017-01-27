import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule,Routes }   from '@angular/router';

import { AppRoutingModule } from './app-routing.module'

import { MailService } from './services/mail.service';

import { AppComponent }  from './app.component';
import { SideBarComponent } from "./side-bar/side-bar.component";
import { MailCardListComponent } from './mail-card-list/mail-card-list.component';
import { ObjNgFor } from "./pipes/obj-ng-for.pipe";

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    HttpModule
    // RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    SideBarComponent,
    ObjNgFor,
    MailCardListComponent
  ],
  providers:[
    MailService
  ],
  bootstrap:[
    AppComponent
  ]
})
export class AppModule { }
