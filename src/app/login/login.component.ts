import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
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
  ) {
  }

  authenticate() {

  }
}
