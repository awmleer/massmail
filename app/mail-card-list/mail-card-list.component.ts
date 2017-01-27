import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

@Component({
  selector: 'mail-card-list',
  templateUrl:'app/mail-card-list/mail-card-list.component.html'
})

export class MailCardListComponent  {
  name='Angular';
  p:string;
  constructor(
    // private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.p=this.route.params[0].value.id;
    // console.log(this.route.params.value);
    // console.log(this.location);
    this.route.params
      .subscribe((params:Params) => {
      this.p = params['box_name'];
        console.log(params);});
  }

}
