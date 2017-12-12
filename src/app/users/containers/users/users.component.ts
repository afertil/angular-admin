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

      <app-user-list
        [users]="usersTable"
        (remove)="removeUser($event)">
      </app-user-list>

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
      (users: User[]) => {
        this.users = users;
        this.usersTable = new MatTableDataSource<User>(users);
        this.isLoadingResults = false;
      },
      error => this.loggerService.error(error.error.message)
    );
  }

  removeUser($event) {
    console.log($event);
  }
}
