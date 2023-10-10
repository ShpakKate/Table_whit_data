import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Pipe({
  name: 'dateUnix'
})
export class DateUnixPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      console.log((value.getTime() / 1000).toString())
      return (value.getTime() / 1000).toString();
    }
  }
}
