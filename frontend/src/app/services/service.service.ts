import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { PaginatedResult } from '@app/models/util.model';
import { Service } from '@app/models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPaginated(
    page: number = 1,
    limit: number = 10,
    sortField: string = '',
    sortOrder: string = '',
    searchTerm: string = ''
  ): Observable<PaginatedResult<Service>> {
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
    return this.http.get<PaginatedResult<Service>>(this.apiUrl, {
      headers,
      params,
    });
  }

  addService(data: Service): Observable<Service> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<Service>(`${this.apiUrl}`, data, { headers });
  }

  updateService(serviceId: string, data: Service): Observable<Service> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<Service>(`${this.apiUrl}/${serviceId}`, data, { headers });
  }

  deleteService(serviceId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/${serviceId}`, { headers });
  }
}
