import {Routes, RouterModule} from '@angular/router';
import {Login} from './login';
import {Courses, ChangeCourses} from './courses';
import {CanLoginGuard,CanActivateGuard} from './services';

import {DataResolver} from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'login',
    component: Login,
    canActivate: [CanLoginGuard]
  },
  {
    path: 'courses',
    component: Courses,
    canActivate: [CanActivateGuard]
  },
  {
    path: 'courses/:id',
    component: ChangeCourses,
    canActivate: [CanActivateGuard]
  },
  {
    path: '**',
    redirectTo: 'courses'
  },
];
