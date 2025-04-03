import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { User } from '@app/models/user.model';
import { Vehicle } from '@app/models/vehicle.model';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-appointment-card',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  role: string | null = null;
  @Input() appointment: Appointment;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.role$.subscribe((role) => {
      this.role = role;
    });
  }

  getFullName() {
    if (typeof this.appointment.clientId === 'object') {
      return (
        this.appointment.clientId.first_name +
        ' ' +
        this.appointment.clientId.last_name
      );
    }
    return 'Inconnue';
  }

  getClient(): User {
    if (!(typeof this.appointment.clientId === 'object'))
      throw new Error('CLIENT_NOT_FOUND');
    return this.appointment.clientId;
  }

  getVehicle(): Vehicle {
    if (!(typeof this.appointment.vehicleId === 'object'))
      throw new Error('VEHICULE_NOT_FOUND');
    return this.appointment.vehicleId;
  }

  getVehiculeFullName(): string {
    try {
      const vehicle = this.getVehicle();
      return `${vehicle.marque} ${vehicle.modele} ${vehicle.annee}`;
    } catch (error) {
      return 'Véhicule inconnue';
    }
  }

  getDetailRoute(): string {
    console.log('NEXT_ROUTES', 'appointments/' + this.appointment.id);
    return 'appointments/' + this.appointment.id;
  }
}
