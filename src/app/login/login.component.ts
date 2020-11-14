import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from '../api.service';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
})
export class LoginComponent {

  login = true;
  hide = true;

  password: string;
  email: string;

  passwordConfirmation: string;
  firstName: string;
  lastName: string;

  constructor(
    public apiService: ApiService,
    public snackBar: MatSnackBar,
    public router: Router,
    public jwtHelper: JwtHelperService,
  ) {
  }

  authenticate() {
    this.apiService.authenticate({username: this.email, password: this.password}).subscribe(o => {
      const accessToken = o.access_token;
      sessionStorage.setItem('token', accessToken);
      this.router.navigate(['ir-calculator']);
    });
  }

  createUser() {
    this.apiService.createUser({
        email    : this.email,
        firstName: this.firstName,
        lastName : this.lastName,
        username : this.email,
        password : this.password,
      },
    ).subscribe(o => {
      this.login = true;
    });
  }
}
