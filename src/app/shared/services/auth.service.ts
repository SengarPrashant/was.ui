import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  baseUrl = environment.apiBaseUrl
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient,
     private router: Router,
     @Inject(PLATFORM_ID) private platformId: any) {
    this.loadUser();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ accessToken: string; refreshToken:string; userDetails: User }>(`${this.baseUrl}/Auth`, credentials).pipe(
      tap(res => {
        if (res?.accessToken && res?.userDetails) {
          localStorage.setItem(this.tokenKey, res.accessToken);
          localStorage.setItem(this.userKey, JSON.stringify(res.userDetails));
          this.user$.next(res.userDetails);
        } else {
          console.warn('Login response missing token or user');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user$.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

 getUser(): User | null {
  if (this.isBrowser()) {
    const userJson = localStorage.getItem(this.userKey);
    if (userJson && userJson !== 'undefined') {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        console.error('Invalid JSON for user:', e);
        return null;
      }
    }
  }
  return null;
}

  private loadUser() {
    if(this.isBrowser()){
    const userJson = localStorage.getItem(this.userKey);
    try {
      if (userJson && userJson !== 'undefined') {
        this.user$.next(JSON.parse(userJson));
      } else {
        this.user$.next(null);
      }
    } catch (error) {
      console.error('Failed to parse user JSON from localStorage:', error);
      this.user$.next(null);
    }
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if running in the browser
   isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
