import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatwithNbsp'
})
export class FormatwithNbspPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) { return value; }
    return value.split("").join("'&nbsp;'");
  }

}
