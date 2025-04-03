import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { Service } from '@app/models/service.model';
import { User } from '@app/models/user.model';
import { Vehicle } from '@app/models/vehicle.model';
import { AppointmentService } from '@app/services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMechanicToAppointmentDialogComponent } from './add-mechanic-to-appointment-dialog/add-mechanic-to-appointment-dialog.component';

@Component({
  selector: 'app-appointment-detail',
  imports: [MaterialModule, CommonModule],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss',
})
export class AppointmentDetailComponent {
  appointmentId: string | null = null;
  appointment: Appointment | null = null;
  client: User | null = null;
  vehicle: Vehicle | null = null;
  serviceDataSource: MatTableDataSource<Service>;
  serviceDisplayedColumn: string[] = ['name', 'price', 'status', 'actions'];
  mechanicDataSource: MatTableDataSource<User>;
  mechanicDisplayedColumn: string[] = ['name', 'email', 'phone'];
  actualStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {
    this.serviceDataSource = new MatTableDataSource<Service>([]);
    this.mechanicDataSource = new MatTableDataSource<User>([]);
  }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    this.loadAppointment();
  }

  loadAppointment() {
    this.appointmentService
      .getAppointmentById(this.appointmentId || '')
      .subscribe((result) => {
        this.appointment = result;
        this.client = this.extractClient(result);
        this.vehicle = this.extractVehicle(result);
        this.mechanicDataSource.data = this.extractMechanics(result);
        this.serviceDataSource.data = result.services;
        this.actualStatus = result.status;
      });
  }

  private extractClient(appointment: Appointment): User | null {
    if (appointment && typeof appointment.clientId === 'object') {
      return appointment.clientId as User;
    }
    return null;
  }

  private extractVehicle(appointment: Appointment): Vehicle | null {
    if (appointment && typeof appointment.vehicleId === 'object') {
      return appointment.vehicleId as Vehicle;
    }
    return null;
  }

  private extractMechanics(appointment: Appointment): User[] {
    if (appointment && Array.isArray(appointment.mechanicIds)) {
      return appointment.mechanicIds.filter(
        (mechanic) => typeof mechanic === 'object'
      ) as User[];
    }
    return [];
  }

  openAddMechanicDialog(): void {
    const dialogRef = this.dialog.open(
      AddMechanicToAppointmentDialogComponent,
      {
        width: '500px',
        data: {appointmentId: this.appointmentId},
      }
    );

    dialogRef.afterClosed().subscribe((result: User[]) => {
      if (result && result.length > 0) {
        const existingIds = new Set(this.mechanicDataSource.data.map(m => m.id));
        const newMechanics = result.filter(m => !existingIds.has(m.id));
    
        if (newMechanics.length > 0) {
          this.mechanicDataSource.data = [...this.mechanicDataSource.data, ...newMechanics];
        }
      }
    });
    
  }

  validateAppointment(): void {
    this.appointmentService.validateAppointment(this.appointmentId || '')
    .subscribe(result => {
      this.actualStatus = "in progress";
    });
  }

  cancelAppointment(): void {
    this.appointmentService.validateAppointment(this.appointmentId || '')
    .subscribe(result => {
      this.actualStatus = "canceled";
    });
  }

}
