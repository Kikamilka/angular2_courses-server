import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
  private static TEST_NAME: string = "q";
  private static TEST_PASSWORD: string = "q";
  isLoggedIn: boolean = false;
  redirectUrl: string;
  loginName: string;


  constructor(private router: Router) {
  }

  isTestLogin(name: string, password: string): boolean {
    return (name == LoginService.TEST_NAME && password == LoginService.TEST_PASSWORD);
  }

  login(name: string, password: string): Observable<boolean> {
    if (!this.isTestLogin(name, password)) {
      return Observable.create(observer => {
        observer.error('Не верно введен логин или пароль');
      });
    }
    else {
      this.isLoggedIn = true;
      this.loginName = name;
      return Observable.of(true);
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.loginName = '';
    localStorage.removeItem(LoginService.TEST_NAME);
    this.router.navigate(["../login"]);
  }
}
