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
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { Service } from '@app/models/service.model';
import { AppointmentService } from '@app/services/appointment.service';
import { ServiceService } from '@app/services/service.service';

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
    return d !== null && d >= new Date(); // Désactive les dates passées
  };

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group({
      date: new FormControl(new Date()),
      time: new FormControl(''),
      services: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  get serviceSelection(): FormArray {
    return this.appointmentForm.get('services') as FormArray;
  }

  loadServices(): void {
    this.serviceService.getPaginated(1, 100).subscribe((data) => {
      this.services = data.docs;
    });
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

    this.appointmentService.addApointment(this.appointmentForm.value as Appointment)
    .subscribe(response => {
      console.log('Rendez-vous soumis:', this.appointmentForm.value);
    });
  }
}
