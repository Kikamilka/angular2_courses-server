import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <header>
    </header>
    <nav class="navbar navbar-default">
      <div class="navbar-header">
          <a class="logo-img" href="{{url}}">
            <img style="width:50px;height:50px" [src]="angularclassLogo">            
          </a>
        </div>
      <div class="container-fluid">        
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            Angular 2 training application            
          </a>
        </div>        
        <ul class="nav navbar-nav">
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}"><a [routerLink]="['./login']">Login</a></li>
          <li [routerLinkActive]="['active']" [routerLinkActiveOptions]="{exact:true}"><a [routerLink]="['./courses']">Courses</a></li>
        </ul> 
        <div class="nav login-name-field" *ngIf="loginService.isLoggedIn">
          <div >User: {{loginService.loginName}}</div>
          <button (click)="loginService.logout()">Logout</button>
        </div>       
      </div>      
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
    
    <footer>
      <div class="panel-footer">
        This Angular2 application based on webpack-starter
      </div>
    </footer>
  `
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef: ViewContainerRef, public loginService: LoginService, private router: Router) {
    this.viewContainerRef = viewContainerRef;
  }

  angularclassLogo = 'assets/img/angularclass-avatar.png';
  url = 'https://angular.io';
}
