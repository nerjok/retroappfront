import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  errorMessage$ = new Subject<string | null>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(formValues: { email: string; password: string }) {
    this.errorMessage$.next(null);
    this.authService
      .login(formValues.email, formValues.password)
      .subscribe({next: () => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      }, 
      error: () => {this.errorMessage$.next('Failed to authentificate')}, 
      complete: () => {}}
      );
  }
}
