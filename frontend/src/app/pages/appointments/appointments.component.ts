import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { AppointmentService } from '@app/services/appointment.service';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-appointments',
  imports: [MaterialModule, CommonModule, AppointmentCardComponent, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
  role: string | null = null;
  totalItems: number = 50;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5];
  appointments: { [date: string]: Appointment[] };

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
    this.loadAppointments();
  }

  loadAppointments(): void {
    if (this.role === 'manager') {
      this.appointmentService
      .getAllAppointments()
      .subscribe((result) => {
        this.appointments = this.groupAppointmentsByDate(result);
      });
    } else if (this.role === "mecanicien") {
      this.appointmentService
        .getMechanicsAppointments()
        .subscribe((result) => {
          this.appointments = this.groupAppointmentsByDate(result.docs);
        });
    } else {
      this.appointmentService
        .getClientAppointments()
        .subscribe((result) => {
          this.appointments = this.groupAppointmentsByDate(result.docs);
        });
    }
  }

  cancelAppointment(appointmentId: string): void {
    this.appointmentService
      .cancelAppointment(appointmentId)
      .subscribe((response) => {
        this.snackBar.open('Appointment cancelled successfully', 'Close', {
          duration: 2000,
        });
        this.loadAppointments();
      });
  }

  groupAppointmentsByDate(appointments: Appointment[]): { [date: string]: Appointment[] } {
    return appointments.reduce((acc, appointment) => {
      const date = new Date(appointment.date).toISOString().split("T")[0];
  
      if (!acc[date]) {
        acc[date] = [];
      }
  
      acc[date].push(appointment);
      return acc;
    }, {} as { [date: string]: Appointment[] });
  }
}
