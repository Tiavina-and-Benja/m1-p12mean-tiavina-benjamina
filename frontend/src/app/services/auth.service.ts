  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { environment } from '@environments/environment';
import { LoginResponse } from '@app/models/auth.model';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private roleSubject = new BehaviorSubject<string | null>(this.getUserRole()); 
  role$ = this.roleSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string, role: string = ''): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login${role ? '/' + role : ''}`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.roleSubject.next(response.user.profil);
      })
    );
  }

  logout (): void {
    localStorage.removeItem('token');
  }

  register(userData: User, role: string = ''): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register${role ? '/' + role : ''}`, userData);
  }

  decodeToken(token: string): any {
    return jwt_decode.jwtDecode(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = this.decodeToken(token);
    return decodedToken.profil;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
