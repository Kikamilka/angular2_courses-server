import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder} from '@angular/forms';
import {CoursesService} from './service/courses.service';
import {Course} from '../classes/course';

@Component({
  selector: 'courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['./courses.style.css']
})

export class Courses implements OnInit{
  courseForm: FormGroup;
  courses: Course[] = [];

  constructor(private fb: FormBuilder, private coursesService: CoursesService) {
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(data => {
      this.courses = data;
    }, (error) => {
      alert(error);
    });
  }

  ngOnInit(): any {
    this.getCourses();
    this.courseForm = this.fb.group({});
  }

  deleteCourse(deleteIndex: number) {
    if (confirm("Уверены что хотите удалить курс "+this.courses[deleteIndex].title+"?")) {
      this.coursesService.deleteCourse(deleteIndex);
    }
  }
}
