import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MailCardListComponent } from './mail-card-list/mail-card-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/box/1', pathMatch: 'full' },
  // { path: 'dashboard',  component: MailCardListComponent },
  { path: 'box/:box_name', component: MailCardListComponent }
  // { path: 'heroes',     component: MailCardListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
