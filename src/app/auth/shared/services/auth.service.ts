
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Store } from '../../../../store';
import { APP_CONFIG } from './../../../../config';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  constructor(
    // private store: Store,
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  get user() {
    return {
      uid: ''
    };
  }

  // get authState() {
  // }

  createUser(email: string, password: string) {
  }

  /**
   * Log in the user
   *
   * @param {string} email - Email user
   * @param {string} password - Password user
   */
  loginUser(email: string, password: string) {
    return this.http.post(`${APP_CONFIG.api}/auth/login`, { email, password });
  }

  /**
   * Saves tokens in localStorage
   *
   * @param {array} tokens - Access and refresh JWT tokens
   */
  saveTokens(tokens) {
    localStorage.setItem('access_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
  }

  /**
   * Check if there's an unexpired JWT
   * An offset of 5 seconds is used to be able to refresh the token silently
   *
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    const tokens = this.getTokens();

    if (!tokens.accessToken) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(tokens.accessToken, 5);
  }

  /**
   * Gets token without Bearer
   *
   * @returns {array} tokens - The token without Bearer entry
   */
  private getTokens() {
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
      accessToken = accessToken.substring(7);
    }
    if (refreshToken) {
      refreshToken = refreshToken.substring(7);
    }

    return { accessToken, refreshToken};
  }

  /**
   * Logged out the user from the application
   */
  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
