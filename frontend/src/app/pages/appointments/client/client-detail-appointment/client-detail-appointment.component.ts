import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { Service } from '@app/models/service.model';
import { User } from '@app/models/user.model';
import { Vehicle } from '@app/models/vehicle.model';
import { AppointmentService } from '@app/services/appointment.service';

@Component({
  selector: 'app-client-detail-appointment',
  imports: [MaterialModule],
  templateUrl: './client-detail-appointment.component.html',
  styleUrl: './client-detail-appointment.component.scss',
})
export class ClientDetailAppointmentComponent implements OnInit {
  appointment: Appointment | null = null;
  client: User | null = null;
  vehicle: Vehicle | null = null;
  serviceDataSource: MatTableDataSource<Service>;
  serviceDisplayedColumn: string[] = ['name', 'price', 'status', 'actions'];
  mechanicDataSource: MatTableDataSource<User>;
  mechanicDisplayedColumn: string[] = ['name', 'email', 'phone'];

  constructor(private appointmentService: AppointmentService) {
    this.serviceDataSource = new MatTableDataSource<Service>([]);
    this.mechanicDataSource = new MatTableDataSource<User>([]);
  }

  ngOnInit(): void {
    this.loadAppointment();
  }

  loadAppointment () {
    this.appointmentService.getAppointmentById('')
    .subscribe(result => {
      this.appointment = result;
      this.client = this.extractClient(result);
      this.vehicle = this.extractVehicle(result);
      this.mechanicDataSource.data = this.extractMechanics(result);
      this.serviceDataSource.data = result.services;
    });
  }

  private extractClient(appointment: Appointment): User | null {
    if (appointment && typeof appointment.clientId === "object") {
      return appointment.clientId as User;
    }
    return null;
  }

  private extractVehicle(appointment: Appointment): Vehicle | null {
    if (appointment && typeof appointment.vehicleId === "object") {
      return appointment.vehicleId as Vehicle;
    }
    return null;
  }

  private extractMechanics(appointment: Appointment): User[] {
    if (appointment && Array.isArray(appointment.mechanicIds)) {
      return appointment.mechanicIds.filter(mechanic => typeof mechanic === "object") as User[];
    }
    return [];
  }
  
}
