import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken'; // Key for storing the token
  private userKey = 'authUser'; // Key for storing the user email
  private isBrowser: boolean; // Flag to check if running in browser

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Initialize CSRF protection by fetching the CSRF cookie
  initializeCsrfProtection(): Observable<any> {
    return this.http.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  // Login API call
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, { email, password }, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
  }

  // Store token and user in localStorage
  storeAuthData(user: string, token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.userKey, user);
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Retrieve user from localStorage
  getUser(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.userKey);
    }
    return null;
  }

  // Clear token and user from localStorage
  clearAuthData(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.userKey);
      localStorage.removeItem(this.tokenKey);
    }
  }

  // Logout API call
  logout(): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/logout`, {}, {
      withCredentials: true, // Ensure cookies are sent with the request
    });
  }
}
