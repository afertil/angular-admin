import { Component, ChangeDetectorRef, OnInit, OnDestroy, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { User, AuthService } from '../../auth/shared/services/auth.service';
import { Store } from '../../../store';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['sidebar.component.scss'],
  template: `
    <mat-sidenav-container class="sidenav">
      <mat-sidenav #sidenav
        *ngIf="user$ | async"
        [opened]="toggle"
        [mode]="getMode()"
        class="container"
        [fixedInViewport]="mobileQuery.matches"
        fixedTopGap="64">

        <mat-nav-list>
          <a mat-list-item routerLink="dashboard">Dashboard</a>
          <a mat-list-item routerLink="articles">Articles</a>
          <a mat-list-item routerLink="users">Users</a>
        </mat-nav-list>

      </mat-sidenav>

      <mat-sidenav-content>
        <div class="wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `
})
export class SidebarComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Input()
  toggle: boolean;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.user$ = this.authService.user;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * Retrive the mode of the sidenav according to the type of device
   */
  getMode() {
    return this.mobileQuery.matches ? 'over' : 'side';
  }
}
