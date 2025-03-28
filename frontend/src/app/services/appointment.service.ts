import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '@app/models/appointment.model';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Vehicle } from '@app/models/vehicle.model';
import { User } from '@app/models/user.model';

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

  getAppointmentById(appointmentId: string): Observable<Appointment> {
    const fakeAppointment = {
      id: '65a4f9c2b7e5f20015a1b3c7',
      clientId: {
        id: '603d2f1a9a1c4b0015a4f9c2',
        first_name: 'Tiavina',
        last_name: 'Ramiandrisoa',
        email: 'tiavinaramia@gmail.com',
        phone: '032 66 131 80',
      } as User,
      vehicleId: {
        id: 'VHC123456',
        brand: 'Toyota',
        model: 'Corolla 2025',
        licensePlate: 'ABC-1234',
        year: 2025,
      } as Vehicle,
      mechanicIds: [
        {
          id: '603d2f1a9a1c4b0015a4f9c5',
          first_name: 'Tiavina',
          last_name: 'Ramiandrisoa',
          email: 'tiavinaramia@gmail.com',
          phone: '032 66 131 80',
        } as User,
        {
          id: '603d2f1a9a1c4b0015a4f9c6',
          first_name: 'Tiavina',
          last_name: 'Ramiandrisoa',
          email: 'tiavinaramia@gmail.com',
          phone: '032 66 131 80',
        } as User,
      ],
      appointmentDate: new Date('2025-03-30T11:00:00.000Z'),
      status: 'in progress',
      services: [
        {
          id: 'SRV001',
          name: 'Vidange moteur',
          price: 50,
          description: "Changement d'huile et du filtre à huile",
          status: 'in progress',
        },
        {
          id: 'SRV002',
          name: 'Changement de plaquettes de frein',
          price: 100,
          description: 'Remplacement des plaquettes avant et arrière',
          status: 'pending',
        },
      ],
      remarks: 'Client souhaite un contrôle général du véhicule.',
    } as Appointment;
    return of(fakeAppointment);
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
