import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Reparation } from '@app/models/reparation.model';
import { Service } from '@app/models/service.model';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-vehicule-detail',
  imports: [MaterialModule],
  templateUrl: './vehicule-detail.component.html',
  styleUrl: './vehicule-detail.component.scss'
})
export class VehiculeDetailComponent implements OnInit {
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
