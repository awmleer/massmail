import { Pipe,PipeTransform } from '@angular/core';

@Pipe({name: 'objNgFor',pure:false})
export class ObjNgFor implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => Object.assign({ key }, value[key]));
    // return Object.keys(value);//.map(key => value[key]);
  }
}
