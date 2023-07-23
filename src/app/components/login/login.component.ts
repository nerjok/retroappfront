import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SimpleFormGroupComponent } from 'src/app/shared/components/simple-form-group/simple-form-group.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: this.fb.control('', Validators.required), //['', Validators.required],
    password: this.fb.control('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const val = this.form.value;
    console.log('loginFunc', val);
    
    if (val.email && val.password) {
      console.log('clickToLog');
      
      this.authService.login(val.email, val.password).subscribe(() => {
        console.log('User is logged in');
        this.router.navigateByUrl('/');
      });
    }
  }
}
