import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, shareReplay, tap } from 'rxjs';

export interface UserLogin {token: any, expiration: string}

const baseUrl = 'https://localhost:7220/';
@Injectable({providedIn: 'root'})
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(userName:string, password:string ) : Observable<UserLogin> {
        return this.http.post<UserLogin>(`${baseUrl}api/users/login`, {userName, password})
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
            .pipe(shareReplay(), tap((auth) => this.setSession(auth)));
    }
  
    private setSession(authResult: UserLogin) {
      const expiresAt = moment().add(authResult.expiration,'second');
      localStorage.removeItem("token");
      localStorage.setItem('token', authResult.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration: any = localStorage.getItem("expiration");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }  
}