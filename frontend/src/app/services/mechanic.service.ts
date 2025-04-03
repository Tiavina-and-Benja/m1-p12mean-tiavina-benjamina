import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/models/user.model';
import { PaginatedResult } from '@app/models/util.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MechanicService {
  private apiUrl = `${environment.apiUrl}/users/mecaniciens`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPaginated(
    page: number = 1,
    limit: number = 10,
    sortField: string = '',
    sortOrder: string = 'asc',
    searchTerm: string = ''
  ): Observable<PaginatedResult<User>> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    return this.http.get<PaginatedResult<User>>(this.apiUrl, {
      headers,
      params,
    });
  }

  addMechanic(data: User): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}`, data, { headers });
  }
}
