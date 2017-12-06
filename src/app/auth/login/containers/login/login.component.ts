import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
      <mat-toolbar color="primary">
        <mat-toolbar-row>
          <h1>Login</h1>
        </mat-toolbar-row>
      </mat-toolbar>

        <!-- <a routerLink="/auth/register">Not registered?</a> -->
        <button mat-raised-button color="primary" type="submit">
          Login
        </button>
        <mat-error class="error" *ngIf="error">
          {{ error }}
        </mat-error>
      </app-auth-form>
    </div>
  `
})

export class LoginComponent {

  error: string;

    constructor(
      // private authService: AuthService,
      private router: Router
    ) {}

    async loginUser(event: FormGroup) {
      const { email, password } = event.value;

      try {
        await console.log({ email, password });
        // await this.authService.loginUser(email, password);
        // this.router.navigate(['/']);
      } catch (err) {
        this.error = err.message;
      }
    }
}
