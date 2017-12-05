import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <ng-content select="h1"></ng-content>

        <mat-form-field>
          <input
            matInput
            type="email"
            placeholder="Email adress"
            formControlName="email">
        </mat-form-field>

        <mat-form-field>
          <input
            matInput
            type="password"
            placeholder="Enter password"
            formControlName="password">
        </mat-form-field>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `
})
export class AuthFormComponent {

  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  onSubmit() {
    console.log(this.form.valid);
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }
}
