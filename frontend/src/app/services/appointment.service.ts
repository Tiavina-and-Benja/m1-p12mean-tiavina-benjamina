import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '@app/models/appointment.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { PaginatedResult } from '@app/models/util.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateServiceStatus(appointmentId: string, serviceId: string, newStatus: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<Appointment>(`${this.apiUrl}/${appointmentId}/services/${serviceId}/status`, {status: newStatus}, { headers });
  }

  payAppointment(appointmentId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<Appointment>(`${this.apiUrl}/${appointmentId}/pay`, {isPaid: true}, { headers });
  }

  addApointment(data: Appointment): Observable<Appointment> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<Appointment>(`${this.apiUrl}`, data, { headers });
  }

  getAppointmentById(appointmentId: string): Observable<Appointment> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<Appointment>(`${this.apiUrl}/${appointmentId}`, {
      headers,
    });
  }

  getClientAppointments(
    page: number = 1,
    limit: number = 25,
    sortField: string = '',
    sortOrder: string = '',
    searchTerm: string = ''
  ): Observable<PaginatedResult<Appointment>> {
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

    return this.http.get<PaginatedResult<Appointment>>(`${this.apiUrl}`, {
      headers,
      params,
    });
  }

  getMechanicsAppointments(
    page: number = 1,
    limit: number = 25,
    sortField: string = '',
    sortOrder: string = '',
    searchTerm: string = ''
  ): Observable<PaginatedResult<Appointment>> {
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

    return this.http.get<PaginatedResult<Appointment>>(`${this.apiUrl}/mecaniciens`, {
      headers,
      params,
    });
  }

  getAllAppointments(): Observable<Appointment[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<Appointment[]>(`${this.apiUrl}/all`, {
      headers,
    });
  }

  validateAppointment(appointmentId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.apiUrl}/${appointmentId}/validate`, {}, {
      headers,
    });
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<any>(`${this.apiUrl}/${appointmentId}/cancel`, {}, {
      headers,
    });
  }

  addMechanicsToAppointment(appointmentId: string, mechanicIds: string[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/${appointmentId}/add-mechanics`, {appointmentId, mechanicIds}, {
      headers,
    });
  }
}
