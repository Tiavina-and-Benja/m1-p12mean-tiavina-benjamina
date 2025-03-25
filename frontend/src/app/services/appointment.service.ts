import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '@app/models/appointment.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = `${environment.apiUrl}/appointments`;
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  

  addApointment(data: Appointment): Observable<Appointment> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post<Appointment>(`${this.apiUrl}`, data, { headers });
  }

  // Simuler des données factices pour les rendez-vous
  getClientAppointments(clientId: string): Observable<any[]> {
    // Remplacer ces données par une réponse du backend quand il sera prêt
    const fakeAppointments = [
      {
        _id: '1',
        appointment_date: new Date('2025-03-25T14:00:00'),
        vehicle: {
          _id: '1',
          brand: 'TOYOTA',
          model: 'Corolla',
          licensePlate: 'ATS',
          year: 2020,
        },
        status: 'pending',
      },

      {
        _id: '1',
        appointment_date: new Date('2025-03-25T14:00:00'),
        vehicle: {
          _id: '1',
          brand: 'TOYOTA',
          model: 'Corolla',
          licensePlate: 'ATS',
          year: 2020,
        },
        status: 'pending',
      },

      {
        _id: '1',
        appointment_date: new Date('2025-03-25T14:00:00'),
        vehicle: {
          _id: '1',
          brand: 'TOYOTA',
          model: 'Corolla',
          licensePlate: 'ATS',
          year: 2020,
        },
        status: 'pending',
      },
    ];

    return of(fakeAppointments); // Retourne les données factices comme Observable
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    // Logique pour annuler le rendez-vous (simulé ici)
    console.log(`Cancel appointment with ID: ${appointmentId}`);
    return of({ message: 'Appointment cancelled successfully' }); // Simuler la réponse
  }
}
