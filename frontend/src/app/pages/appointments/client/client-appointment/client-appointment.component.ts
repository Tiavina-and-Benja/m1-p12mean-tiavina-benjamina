import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from '@app/services/appointment.service';
import { MaterialModule } from '@app/material.module';
import { CommonModule } from '@angular/common';
import { ClientAppointmentTableComponent } from './client-appointment-table/client-appointment-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '@app/models/appointment.model';
import { ServiceCardComponent } from '@app/service-card/service-card.component';

@Component({
  selector: 'app-client-appointment',
  imports: [
    MaterialModule,
    CommonModule,
    ClientAppointmentTableComponent,
    ServiceCardComponent,
  ],
  templateUrl: './client-appointment.component.html',
  styleUrl: './client-appointment.component.scss',
})
export class ClientAppointmentsComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment>;
  displayedColumns: string[] = [
    'appointment_date',
    'vehicle',
    'status',
    'actions',
  ];
  clientId = '65f3a72d1a4e5a001f2e3b5c';
  totalItems: number = 50;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5];

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Appointment>([]);
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService
      .getClientAppointments(this.clientId)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  cancelAppointment(appointmentId: string): void {
    this.appointmentService
      .cancelAppointment(appointmentId)
      .subscribe((response) => {
        this.snackBar.open('Appointment cancelled successfully', 'Close', {
          duration: 2000,
        });
        this.loadAppointments(); // Rafraîchir la liste des rendez-vous après l'annulation
      });
  }
}
