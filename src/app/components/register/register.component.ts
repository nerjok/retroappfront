import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthCredentials, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  errorMessage$ = new Subject<string | null>();

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: AuthCredentials) {
    this.errorMessage$.next(null);
    this.authService
      .register(formValues.email, formValues.password, formValues.email)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.errorMessage$.next(JSON.stringify(error.error));
        },
        complete: () => {},
      });
  }
}
