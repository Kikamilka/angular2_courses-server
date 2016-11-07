import {Injectable} from '@angular/core';
import {COURSES} from '../mocks/mock-courses';
import {Course} from '../../classes/course'
import {Observable} from "rxjs";

@Injectable()
export class CoursesService {

  getCourses(): Observable<Course[]> {
    return Observable.create(observer => observer.next(COURSES));
  }

  getCourse(id: number): Observable<Course> {
    return Observable.create(observer => observer.next(this.getCourses())[id]);
  }

  addCourse(course: Course): void {
    this.getCourses().subscribe(data => data.push(course));
  }

  updateCourse(id: number, newCourse: Course): void {
    this.getCourses().subscribe(data => data.splice(id, 1, newCourse));
  }

  deleteCourse(id: number): void {
    this.getCourses().subscribe(data => data.splice(id, 1));
  }
}
