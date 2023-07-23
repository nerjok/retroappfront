import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UserLogin {
  token: any;
  expiration: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<UserLogin> {
    console.log('[service]');
const url = `${this.baseUrl}api/users/login`;
    this.http.post<UserLogin>(url, { userName, password }).subscribe((dt) => {
        console.log(dt)
      })
    return this.http
      .post<UserLogin>(`${this.baseUrl}api/users/login`, { userName, password })
      .pipe(
        tap((auth) => {
          console.log('oneLog');

          this.setSession(auth);
        })
      );
  }

  private setSession(authResult: UserLogin) {
    const expiresAt = moment().add(authResult.expiration, 'second');
    localStorage.removeItem('token');
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expiration');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
