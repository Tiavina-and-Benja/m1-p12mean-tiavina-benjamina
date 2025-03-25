import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-client-appointment-table',
  imports: [MaterialModule, CommonModule],
  templateUrl: './client-appointment-table.component.html',
  styleUrl: './client-appointment-table.component.scss'
})
export class ClientAppointmentTableComponent {

  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = ['appointment_date', 'vehicle', 'status', 'actions'];
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions!: number[];
  @Input() title!: string;

  @Output() onPageChange = new EventEmitter<any>();
  @Output() cancelAppointment = new EventEmitter<any>();

  constructor() {}

  handleCancelAppointment(id: string) { 
    this.cancelAppointment.emit(id);
  }

  handlePageChange(event: PageEvent) {
    this.onPageChange.emit(event);
  }

  getVehicleFullName(vehicle: any) {
    return `${vehicle.brand}, ${vehicle.model}, ${vehicle.year}`;
  }
}
