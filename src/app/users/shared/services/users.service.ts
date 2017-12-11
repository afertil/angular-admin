import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { APP_CONFIG } from './../../../../config';
import { User } from '../../../auth/shared/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private http: HttpClient,
  ) {}

  getUsers() {
    return this.http.get(`${APP_CONFIG.api}/users`);
  }

  getUser(id: number) {

  }

  createUser(user: User) {

  }

  updateUser(id: number, user: User) {

  }

  removeUser(id: number) {

  }
}
