import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from './service/courses.service';
import {Course} from '../classes/course';
import {AUTHORS} from './mocks/mock-authors'

@Component({
  selector: 'add-course',
  templateUrl: 'change-courses.component.html',
  styleUrls: ['./courses.style.css']
})

export class ChangeCourses implements OnInit {
  course: Course;
  courses: Course[] = [];
  allAuthors: string[];
  selectedAuthor: string = '';
  newCourseForm: FormGroup;
  indexCourse: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private coursesService: CoursesService) {
  }

  getCourses(): void {
    this.coursesService.getCourses().subscribe(data => {
      this.courses = data;
    }, (error) => {
      alert(error);
    });
  }

  ngOnInit(): any {
    this.indexCourse = this.route.snapshot.params['id'];
    this.getCourses();
    if (this.indexCourse != 'new') {
      let numberID = +this.indexCourse;
      if (this.courses[numberID]) {
        this.course = this.courses[numberID];
        this.newCourseForm = this.fb.group({
          title: [this.course.title, [Validators.required]],
          description: [this.course.description, [Validators.required]],
          date: [this.course.date, [Validators.required]],
          duration: [this.course.duration, [Validators.required, Validators.pattern('[0-9]*')]],
          authors: [this.course.authors, [Validators.required]]
        });
        let curAuthors = this.course.authors;
        this.allAuthors = AUTHORS;
        this.filterAuthors(curAuthors);
      }
    }
    else {
      this.course = new Course();
      this.newCourseForm = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        date: ['', [Validators.required]],
        duration: ['', Validators.pattern('[0-9]*')],
        authors: [[], Validators.required]
      });
      this.course.authors = [];
      this.allAuthors = AUTHORS;
    }
  }

  private filterAuthors(curAuthors: string[]) {
    this.allAuthors = this.allAuthors.filter(function (item) {
      if (curAuthors.every(function (author) {
          return author != item;
        })) {
        return item;
      }
    });
  }

  saveCourse(value: any, isValid: boolean) {
    if (!this.newCourseForm.valid) {
      alert("Поля заполнены некорректно!");
    }
    else {
      this.course = {
        title: value.title,
        date: value.date,
        duration: value.duration,
        authors: this.course.authors,
        description: value.description
      };
      if (this.indexCourse == 'new') {
        this.coursesService.addCourse(this.course);
      }
      else {
        this.coursesService.updateCourse(+this.indexCourse, this.course);
      }
      this.goBack();
    }
  }


  setSelected(selectElement) {
    this.selectedAuthor = '';
    this.selectedAuthor = selectElement;
  }

  addAuthor() {
    this.course.authors.push(this.selectedAuthor);
    this.filterAuthors(this.course.authors);
  }

  deleteAuthor() {
    this.course.authors = this.course.authors.filter(item => item != this.selectedAuthor);
    this.allAuthors = AUTHORS;
    this.filterAuthors(this.course.authors);
  }

  goBack(): void {
    this.router.navigate(["../courses"]);
  }
}
