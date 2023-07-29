import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input() register = false;
  @Input() errorMessage: string | null = null;
  @Output() formSubmit = new EventEmitter();
  form!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    passwordRepeat: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', Validators.required), //['', Validators.required],
      password: this.fb.control('', Validators.required),
      passwordRepeat: this.fb.control(
        '',
        this.register ? Validators.required : null
      ),
    });
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.value);
  }
  changeAction() {
    this.router.navigateByUrl(this.register ? '/login' : 'register');
  }
}
