import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

// import { User } from '../../auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-header.component.scss'],
  template: `
    <mat-toolbar color="primary" class="app-header">
      <mat-toolbar-row>
        <mat-icon>whatshot</mat-icon>
        <span class="app-title">Angular Admin</span>
      </mat-toolbar-row>
    </mat-toolbar>
  `
})
export class AppHeaderComponent {

  // @Input()
  // user: User;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
  }
}
