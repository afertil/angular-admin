import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-list.component.scss'],
  template: `
    <mat-table #table [dataSource]="users">

      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let user"> {{ user.name }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="email">
        <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
        <mat-cell *matCellDef="let user"> {{ user.email }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="edit">
        <mat-header-cell *matHeaderCellDef> Edit </mat-header-cell>
        <mat-cell *matCellDef="let user">
          <a [routerLink]="getRoute(user)"><mat-icon>mode_edit</mat-icon></a>
        </mat-cell>
      </ng-container>

      <ng-container matColumnDef="delete">
        <mat-header-cell *matHeaderCellDef> Delete </mat-header-cell>
        <mat-cell *matCellDef="let user">
          <mat-icon
            (click)="removeUser(user)">delete</mat-icon>
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>


  <!-- <div class="list-user">
      <a [routerLink]="getRoute(user)">
        <p class="list-user__name">{{ user.name }}</p>
        <p class="list-user__email">{{ user.email }}</p>
      </a>
      <div
        class="list-user__delete"
        *ngIf="toggled">
        <p>Delete user?</p>
        <button
          class="confirm"
          type="button"
          (click)="removeUser()">
          Yes
        </button>
        <button
          class="cancel"
          type="button"
          (click)="toggle()">
          No
        </button>
      </div>
      <button
        class="trash"
        type="button"
        (click)="toggle()">
        <img src="/assets/remove.svg">
      </button>
    </div> -->
  `
})
export class UserListComponent {

  toggled = false;

  displayedColumns = [
    'name',
    'email',
    'edit',
    'delete'
  ];

  @Output()
  remove = new EventEmitter<any>();

  @Input()
  users: any;

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  removeUser(user) {
    this.remove.emit(user);
  }

  getRoute(user: any) {
    return [user._id];
  }
}
