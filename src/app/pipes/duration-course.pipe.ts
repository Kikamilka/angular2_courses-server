import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'durationCourse'
})

export class durationCoursePipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor( value / 60 );
    let minutes = value % 60;
    return hours + ' ч.  ' + minutes + ' мин. ';
  }
}
