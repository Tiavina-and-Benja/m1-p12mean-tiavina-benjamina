import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '@environments/environment';
import { Vehicle } from '@app/models/vehicle.model';
import { PaginatedResult } from '@app/models/util.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicules`;

  constructor(private http: HttpClient, private authService: AuthService) {}
  getPaginated(
    page: number = 1,
    limit: number = 10,
    sortField: string = '',
    sortOrder: string = '',
    searchTerm: string = ''
  ): Observable<PaginatedResult<Vehicle>> {
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
    return this.http.get<PaginatedResult<Vehicle>>(this.apiUrl, {
      headers,
      params,
    });
  }

  addVehicle(data: Vehicle): Observable<Vehicle> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<Vehicle>(`${this.apiUrl}`, data, { headers });
  }

  updateVehicle(vehicleId: string, data: Vehicle): Observable<Vehicle> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicleId}`, data, {
      headers,
    });
  }

  deleteService(vehicleId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${this.apiUrl}/${vehicleId}`, { headers });
  }

}
