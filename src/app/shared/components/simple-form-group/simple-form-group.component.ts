import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-simple-form-group',
  templateUrl: './simple-form-group.component.html',
  styleUrls: ['./simple-form-group.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SimpleFormGroupComponent implements AfterViewInit {
  @Input() label?: string;
  @ContentChild(NgControl) ngControl!: FormGroupDirective;
  get formControl() {
    return this.ngControl.control as AbstractControl;
  }

  get errorKeys(): string[] {
    return this.getFormValidationErrors();
  }
  ngAfterViewInit(): void {
  }

  getFormValidationErrors(): string[] {
    if (!this.formControl?.touched) {
      return [];
    }
    // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    const errors = this.formControl.errors;
    if (!errors) {
      return [];
    }

    if (!errors || !Object.keys(errors).length) {
      return [];
    }
    const errorKeys: string[] = [];
    Object.keys(errors).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.formControl?.get(key)?.errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
      errorKeys.push(key);
    });

    console.log('Number of errors: ', totalErrors);
    return errorKeys;
  }
}
