import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { AppointmentService } from '@app/services/appointment.service';
import { ManagerValidateAppointmentComponent } from '../manager-validate-appointment/manager-validate-appointment.component';
import { ManagerCancelingDialogAppointmentComponent } from './manager-canceling-dialog-appointment/manager-canceling-dialog-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { ManagerValidateDialogAppointmentComponent } from './manager-validate-dialog-appointment/manager-validate-dialog-appointment.component';

@Component({
  selector: 'app-manager-pending-appointment',
  imports: [MaterialModule, CommonModule],
  templateUrl: './manager-pending-appointment.component.html',
  styleUrl: './manager-pending-appointment.component.scss',
})
export class ManagerPendingAppointmentComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment>;
  displayedColumns: string[] = ['appointment_date', 'vehicle', 'actions'];

  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {
    this.dataSource = new MatTableDataSource<Appointment>([]);
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getClientAppointments('').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openCancelDialogAppointment(): void {
    const dialogRef = this.dialog.open(
      ManagerCancelingDialogAppointmentComponent,
      {
        width: '500px',
        data: {},
      }
    );

    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.loadAppointments();
      }
    });
  }
  openValidateDialogAppointment() {
    const dialogRef = this.dialog.open(
      ManagerValidateDialogAppointmentComponent,
      {
        width: '500px',
        data: {},
      }
    );

    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        this.loadAppointments();
      }
    });
  }

  getVehicleFullName(vehicle: any) {
    return `${vehicle.brand}, ${vehicle.model}, ${vehicle.year}`;
  }
}
