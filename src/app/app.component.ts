import { Component, OnInit } from '@angular/core';

import { User, AuthService } from './auth/shared/services/auth.service';
import { Router } from '@angular/router';
import { LoggerService } from './shared/logger/logger.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <app-header *ngIf="user$"
        [user]="user$ | async"
        (logout)="onLogout()"
      >
      </app-header>
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private loggerService: LoggerService
  ) {}

  subscription: Subscription;
  user$: Observable<User>;

  ngOnInit() {
    this.user$ = null; // this.authService.user;
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
    this.loggerService.success('Successfully disconnected');
  }
}
