import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-header.component.scss'],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <mat-toolbar-row>
        <mat-icon>whatshot</mat-icon>
        <span class="app-title">Angular Admin</span>
        <span class="space"></span>

        <div>
          <button mat-icon-button matTooltip="Account" [mat-menu-trigger-for]="userMenu" tabindex="-1">
            <mat-icon>account_circle</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <button
              mat-menu-item
              (click)="logoutUser()">
              <mat-icon>power_settings_new</mat-icon>
              <span>Disconnect</span>
            </button>
          </mat-menu>
        </div>

      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class AppHeaderComponent {

  @Input()
  user: User;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
  }
}
