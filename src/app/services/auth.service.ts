import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor() {}

  // Simulate login and store token
  login(username: string, password: string): boolean {
    // This is mocked – replace with real API later if needed
    if (username === 'admin' && password === 'password') {
      localStorage.setItem(this.TOKEN_KEY, 'mock-token-12345');
      return true;
    }
    return false;
  }

  // Remove token from localStorage
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if token exists
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // Get the token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
