import { Component, ChangeDetectorRef, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['sidebar.component.scss'],
  template: `
    <mat-sidenav-container class="sidenav">
      <mat-sidenav #sidenav
        [opened]="toggle"
        [mode]="getMode()"
        class="container"
        [fixedInViewport]="mobileQuery.matches"
        fixedTopGap="64">

        <mat-nav-list>
          <a mat-list-item routerLink="dashboard">Dashboard</a>
          <a mat-list-item routerLink="users">Users</a>
        </mat-nav-list>

      </mat-sidenav>

    </mat-sidenav-container>
  `
})
export class SidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @Input()
  toggle: boolean;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
