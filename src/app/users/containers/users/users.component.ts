import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { User } from './../../../auth/shared/services/auth.service';
import { UsersService } from '../../shared/services/users.service';
import { LoggerService } from './../../../shared/logger/logger.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  styleUrls: ['users.component.scss'],
  template: `
    <div>
      <!-- <mat-spinner *ngIf="isLoadingResults"></mat-spinner> -->

      <mat-table #table [dataSource]="usersTable">

      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let user"> {{ user.name }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="email">
      <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
      <mat-cell *matCellDef="let user"> {{ user.email }} </mat-cell>
    </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  `
})
export class UsersComponent implements OnInit {

  users: User[];
  usersTable: MatTableDataSource<User>;
  isLoadingResults = true;

  displayedColumns = [
    'name',
    'email'
  ];

  constructor(
    private usersService: UsersService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    this.usersService.getUsers()
    .subscribe(
      (res: User[]) => {
        this.users = res;
        this.usersTable = new MatTableDataSource<User>(res);
        this.isLoadingResults = false;
      },
      error => this.loggerService.error(error.error.message)
    );
  }
}
