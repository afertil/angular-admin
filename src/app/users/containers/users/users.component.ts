import { Component, OnInit } from '@angular/core';

import { User } from './../../../auth/shared/services/auth.service';
import { UsersService } from '../../shared/services/users.service';
import { LoggerService } from './../../../shared/logger/logger.service';

@Component({
  selector: 'app-users',
  styleUrls: ['users.component.scss'],
  template: `
    <div>
      {{ users | json }}
    </div>
  `
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private usersService: UsersService,
    private loggerService: LoggerService
  ) {}

  ngOnInit() {
    this.usersService.getUsers()
    .subscribe(
      (res: User[]) => {
        this.users = res;
      },
      error => this.loggerService.error(error.error.message)
    );
  }
}
