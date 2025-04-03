import { Component } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { VehicleCardComponent } from './vehicle-card/vehicle-card.component';
import { Vehicle } from '@app/models/vehicle.model';
import { Paginator } from '@app/models/util.model';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '@app/services/vehicle.service';
import { VehicleFormDialogComponent } from './vehicle-form-dialog/vehicle-form-dialog.component';
import { VehicleDeleteDialogComponent } from './vehicle-delete-dialog/vehicle-delete-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-crud',
  imports: [MaterialModule, VehicleCardComponent, CommonModule],
  templateUrl: './vehicle-crud.component.html',
  styleUrl: './vehicle-crud.component.scss',
})
export class VehicleCrudComponent {
  vehicles: Vehicle[];
  paginator: Paginator = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    pageSizeOptions: [5, 10, 25],
  };
  sort: any = {
    field: '',
    order: '',
  };
  searchText: string = '';

  constructor(
    private dialog: MatDialog,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vehicleService
      .getPaginated(
        this.paginator.currentPage,
        this.paginator.pageSize,
        this.sort.field,
        this.sort.order,
        this.searchText
      )
      .subscribe((data) => {
        this.vehicles = data.docs;
        this.paginator.totalItems = data.totalDocs;
      });
  }

  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Vehicle) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openEditVehicleDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '500px',
      data: { vehicle },
    });

    dialogRef.afterClosed().subscribe((result: Vehicle) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteVehicleDialog(vehicle: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDeleteDialogComponent, {
      width: '500px',
      data: { vehicle },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && vehicle?.id) {
        this.vehicleService.deleteService(vehicle.id).subscribe((result) => {
          if (result) {
            this.loadData();
          }
        });
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.paginator.currentPage = event.pageIndex + 1;
    this.paginator.pageSize = event.pageSize;
    this.loadData();
  }

  onSearch() {
    this.paginator.currentPage = 1;
    this.loadData();
  }

  clearSearch() {
    this.searchText = '';
    this.paginator.currentPage = 1;
    this.loadData();
  }
}
