import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeRole'
})
export class RemoveRolePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return value; }
    return value.split("ROLE_").join(" ");
  }

}
