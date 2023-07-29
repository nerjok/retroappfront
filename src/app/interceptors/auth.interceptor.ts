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
import { NEVER, Observable, finalize, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.authService.authToken;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
    });

    const routeExceptions = ['api/users']
    const isRouteExceptional = routeExceptions.some((exception) => req.url.endsWith(exception));
    if(!idToken && !isRouteExceptional) {
      this.router.navigateByUrl('login');
      return next.handle(req)
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
