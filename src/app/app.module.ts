import { NgModule, ApplicationRef, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { Login } from './login';
import { Courses, ChangeCourses } from './courses';
import { CanLoginGuard, CanActivateGuard, myErrorHandler } from './services';
import { CoolDateComponent } from './courses/date/cool-date.component'
import { durationCoursePipe } from './pipes/duration-course.pipe';
import { searchPipe } from './pipes/search.pipe';
import {LoginService} from './login/login.service';
import {CoursesService} from './courses/service/courses.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  LoginService,
  CoursesService,
  AppState,
  CanActivateGuard,
  CanLoginGuard
];

const PIPES = [
  durationCoursePipe,
  searchPipe
];

const MY_ERROR_HANDLER = [
  {
    provide: ErrorHandler,
    useClass: myErrorHandler
  }
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  declarations: [
    CoolDateComponent,
    AppComponent,
    Login,
    Courses,
    ChangeCourses,
    ...PIPES
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    MY_ERROR_HANDLER
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

