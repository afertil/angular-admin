import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';

import { Store } from '../../../../store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  /* auth$ = this.af.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }

      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    }); */

  constructor(
    private store: Store
  ) {}

  // get user() {}

  // get authState() {}

  createUser(email: string, password: string) {
  }

  loginUser(email: string, password: string) {
  }

  logoutUser() {
  }
}
