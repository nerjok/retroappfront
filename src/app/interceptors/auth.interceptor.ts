import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NEVER, Observable, finalize, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
    });

    if(!idToken) {
      this.router.navigateByUrl('login');
      return NEVER;
    }
    const clonedReq = idToken ?  req.clone({ headers }):req;
      return next.handle(clonedReq).pipe(
        tap({
          next: () => {},
          error: (error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.router.navigateByUrl('login');
            }
        },
        })
      );
  }
}
