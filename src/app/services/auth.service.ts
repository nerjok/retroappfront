import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UserLogin {
  token: any;
  expiration: string;
}

export interface AuthCredentials {
  userName: string,
  password: string,
  email: string
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = environment.apiUrl;
  private _authToken?: string;

  get authToken(): string | undefined {
    if (!this._authToken) {
      this._authToken = localStorage.getItem('token') ?? undefined;
    }
    return this._authToken;
  }

  public set authToken(token : string | undefined) {
    this._authToken = undefined;
  }
  
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<UserLogin> {
    console.log('[service]');

    return this.http
      .post<UserLogin>(`${this.baseUrl}api/users/login`, { userName, password })
      .pipe(
        tap((auth) => {
          this.setSession(auth);
        })
      );
  }

  register(
    userName: string,
    password: string,
    email: string
  ): Observable<UserLogin> {
    return this.http
      .post<UserLogin>(`${this.baseUrl}api/users`, {
        userName,
        password,
        email,
      })
      .pipe(
        tap((auth) => {
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
    localStorage.removeItem('expires_at');
    this.authToken = undefined;
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
