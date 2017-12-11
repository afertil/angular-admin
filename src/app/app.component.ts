import { Component, OnInit } from '@angular/core';

import { User, AuthService } from './auth/shared/services/auth.service';
import { Router } from '@angular/router';
import { LoggerService } from './shared/logger/logger.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '../store';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <app-header *ngIf="user$ | async"
        [user]="user$ | async"
        (logout)="onLogout()">
      </app-header>

      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private loggerService: LoggerService
  ) {}

  subscription: Subscription;
  user$: Observable<User>;

  ngOnInit() {
    this.subscription = this.authService.user.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
    this.loggerService.success('Successfully disconnected');
  }
}
