import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    let minutes;
    let hours;

    minutes = value % 60;
    hours = (value - minutes) / 60;

    return hours.toString() + " hour(s) " + (minutes <10 ? "0" : "") + minutes.toString();
    
 }

}
