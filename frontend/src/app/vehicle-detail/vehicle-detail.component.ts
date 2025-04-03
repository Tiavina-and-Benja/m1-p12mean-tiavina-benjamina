import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Reparation } from '@app/models/reparation.model';

@Component({
  selector: 'app-vehicle-detail',
  imports: [MaterialModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {
  displayedColumns: string[] = ['serviceName', 'mechanics' ];
  dataSource: MatTableDataSource<Reparation>;

  constructor() {
    this.dataSource = new MatTableDataSource<Reparation>([]);
  }

  ngOnInit() {
    this.dataSource.data = [
      { serviceName: 'Vidange', mechanics: {first_name: 'tigre', last_name: 'scott', email: 'tiavina@gmail.com', phone: '0326613180'}} as Reparation,
      { serviceName: 'Vidange', mechanics: {first_name: 'tigre', last_name: 'scott', email: 'tiavina@gmail.com', phone: '0326613180'}} as Reparation,
      { serviceName: 'Vidange', mechanics: {first_name: 'tigre', last_name: 'scott', email: 'tiavina@gmail.com', phone: '0326613180'}} as Reparation,
      { serviceName: 'Vidange', mechanics: {first_name: 'tigre', last_name: 'scott', email: 'tiavina@gmail.com', phone: '0326613180'}} as Reparation
    ];
  }
}
