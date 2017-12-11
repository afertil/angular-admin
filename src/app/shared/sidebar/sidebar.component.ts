import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['sidebar.component.scss'],
  template: `
    <mat-sidenav-container class="sidenav">
      <mat-sidenav #sidenav mode="side" opened="true" class="container"
        [fixedInViewport]="false">
        sidenav
      </mat-sidenav>

    </mat-sidenav-container>
  `
})
export class SidebarComponent {
  constructor() {}
}
