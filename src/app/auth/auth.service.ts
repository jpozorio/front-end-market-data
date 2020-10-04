import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getFirstName(): string {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return '';
    }
    return this.jwtHelper.decodeToken(token).firstName;
  }
}
