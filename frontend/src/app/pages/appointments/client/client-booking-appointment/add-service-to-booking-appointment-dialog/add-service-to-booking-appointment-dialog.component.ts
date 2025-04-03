import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { Service } from '@app/models/service.model';
import { ServiceService } from '@app/services/service.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-service-to-booking-appointment-dialog',
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './add-service-to-booking-appointment-dialog.component.html',
  styleUrl: './add-service-to-booking-appointment-dialog.component.scss',
})
export class AddServiceToBookingAppointmentDialogComponent implements OnInit {
  searchText: string = '';
  searchSubject = new Subject<string>();
  services: Service[] = [];
  selectedServices: Service[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddServiceToBookingAppointmentDialogComponent>,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.loadData('');
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.loadData(searchTerm);
    });
  }

  loadData(search: string): void {
    this.serviceService
      .getPaginated(1, 5, 'name', 'asc', search)
      .subscribe((result) => {
        if (result) this.services = result.docs;
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  onToggleService(service: Service) {
    const index = this.selectedServices.findIndex((s) => s.id === service.id);
    if (index === -1) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices.splice(index, 1);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedServices);
  }

  isValid(): boolean {
    return this.selectedServices.length === 0;
  }

  isSelected(service: Service): boolean {
    return this.selectedServices.some((s) => s.id === service.id);
  }
}
