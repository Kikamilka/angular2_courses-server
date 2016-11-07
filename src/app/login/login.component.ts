import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.style.css']
})

export class Login {
  loginForm: FormGroup;
  name: string = '';
  password: string = '';
  textError: string = '';
  isLogin: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): any {
    this.loginForm = this.fb.group({
      name: [this.name, [Validators.required, Validators.pattern('[A-Za-z]*')]],
      password: [this.password, [Validators.required, Validators.pattern('[A-Za-z0-9]*')]]
    });
  }

  onSubmit(value: any) {
    this.loginService.login(value.name, value.password).subscribe(data => {
      this.isLogin = data;
    }, (error) => {
      this.isLogin = false;
      this.textError = error;
      this.loginForm.controls["password"].value.updateValue('');
    });
    if (this.loginService.isLoggedIn) {
      let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/courses';
      this.router.navigate([redirect]);
    }
  }

  isEmpty(controlName: string) {
    const val = this.loginForm.controls[controlName].value;
    return (val.length == 0);
  }
}
