import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { Service } from '@app/models/service.model';
import { AppointmentService } from '@app/services/appointment.service';
import { ServiceService } from '@app/services/service.service';
import { AddServiceToBookingAppointmentDialogComponent } from './add-service-to-booking-appointment-dialog/add-service-to-booking-appointment-dialog.component';
import { VehicleFormDialogComponent } from '@app/pages/vehicle-crud/vehicle-form-dialog/vehicle-form-dialog.component';
import { Vehicle } from '@app/models/vehicle.model';
import { VehicleService } from '@app/services/vehicle.service';

@Component({
  selector: 'app-client-booking-appointment',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './client-booking-appointment.component.html',
  styleUrl: './client-booking-appointment.component.scss',
})
export class ClientBookingAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  services: Service[] = [];
  vehicles: Vehicle[] = [];
  selectedServices: string[] = [];
  timeOptions: string[] = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ];

  dateFilter = (d: Date | null): boolean => {
    return d !== null && d >= new Date();
  };

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {
    this.appointmentForm = this.fb.group({
      date: new FormControl(new Date()),
      time: new FormControl(''),
      services: this.fb.array([]),
      vehicleId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  get serviceSelection(): FormArray {
    return this.appointmentForm.get('services') as FormArray;
  }


  loadVehicles(): void {
    this.vehicleService.getPaginated(1, 100)
    .subscribe(result => {
      this.vehicles = result.docs;
    })
  }

  toggleService(serviceId: string, isChecked: boolean) {
    if (isChecked) {
      this.serviceSelection.push(new FormControl(serviceId));
    } else {
      const index = this.serviceSelection.controls.findIndex(
        (ctrl) => ctrl.value === serviceId
      );
      this.serviceSelection.removeAt(index);
    }
    this.updateSelectedServices();
  }

  updateSelectedServices() {
    this.selectedServices = this.serviceSelection.value;
  }

  selectVehicle(vehicleId: string) {
    this.appointmentForm.controls['vehicleId'].setValue(vehicleId);
  }

  getServiceName(serviceId: string): string {
    const service = this.services.find((s) => s.id === serviceId);
    return service ? service.name : 'Service inconnu';
  }

  onDateSelected(event: Date | null) {
    if (event) {
      this.appointmentForm.controls['date'].setValue(event);
    }
  }

  submitAppointment(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    const appointmentData = {
      ...this.appointmentForm.value,
      services: this.selectedServices || []
    };

    this.appointmentService
      .addApointment(appointmentData)
      .subscribe((response) => {
        console.log('Rendez-vous soumis:', this.appointmentForm.value);
      });
  }

  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(AddServiceToBookingAppointmentDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Service[]) => {
      if (result) {
        for (const service of result) {
          if (!this.services.some(s => s.id === service.id)) {
            this.services.push(service);
          }
          if (service.id && !this.selectedServices.includes(service.id)) this.selectedServices.push(service.id);
        }
      }
    });
  }

  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Vehicle) => {
      if (result) {
        this.loadVehicles();
      }
    });
  }
}
