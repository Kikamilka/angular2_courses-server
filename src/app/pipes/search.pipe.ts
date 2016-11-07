import {Pipe, PipeTransform} from '@angular/core';
import {Course} from '../classes/course'

@Pipe({
  name: 'search'
})

export class searchPipe implements PipeTransform {
  transform(courses: Course[], text: string) {
    if (text !== undefined) {
      return courses.filter((course) => {
        return (course.title.toLowerCase().indexOf(text.toLowerCase()) !== -1);
      });
    }
    else {
      return courses;
    }
  }
}
