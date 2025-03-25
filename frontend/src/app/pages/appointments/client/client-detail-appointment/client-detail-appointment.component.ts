import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Service } from '@app/models/service.model';

@Component({
  selector: 'app-client-detail-appointment',
  imports: [MaterialModule],
  templateUrl: './client-detail-appointment.component.html',
  styleUrl: './client-detail-appointment.component.scss',
})
export class ClientDetailAppointmentComponent implements OnInit {
  dataSourceServices: MatTableDataSource<Service>;
  displayedColumnService: string[] = ['name', 'price', 'status'];

  constructor() {
    this.dataSourceServices = new MatTableDataSource<Service>([]);
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.dataSourceServices.data = [
      {
        name: 'Vidange',
        price: 50_000,
        status: 'in progress',
      } as Service,
      {
        name: 'Vidange',
        price: 50_000,
        status: 'in progress',
      } as Service,
      {
        name: 'Vidange',
        price: 50_000,
        status: 'in progress',
      } as Service,
      {
        name: 'Vidange',
        price: 50_000,
        status: 'in progress',
      } as Service,
    ];
  }
}
