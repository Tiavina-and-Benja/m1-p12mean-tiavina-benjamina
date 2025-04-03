import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Service } from '@app/models/service.model';
import { ServiceService } from '@app/services/service.service';
import { ServiceFormDialogComponent } from './service-form-dialog/service-form-dialog.component';
import { ServiceDeleteDialogComponent } from './service-delete-dialog/service-delete-dialog.component';
import { ServiceCrudTableComponent } from './service-crud-table/service-crud-table.component';
import { Paginator } from '@app/models/util.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-service-crud',
  imports: [MaterialModule, ServiceCrudTableComponent, FormsModule],
  templateUrl: './service-crud.component.html',
  styleUrl: './service-crud.component.scss',
})
export class ServiceCrudComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'description', 'actions'];
  dataSource: MatTableDataSource<Service>;
  serviceForm: FormGroup;
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

  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private dialog: MatDialog,
    private serviceService: ServiceService
  ) {
    this.dataSource = new MatTableDataSource<Service>([]);
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
  }

  loadData() {
    this.serviceService
      .getPaginated(
        this.paginator.currentPage,
        this.paginator.pageSize,
        this.sort.field,
        this.sort.order,
        this.searchText
      )
      .subscribe((data) => {
        this.dataSource.data = data.docs;
        this.paginator.totalItems = data.totalDocs;
      });
  }

  openAddMechanicDialog(): void {
    const dialogRef = this.dialog.open(ServiceFormDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Service) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openEditMechanicDialog(service: Service): void {
    const dialogRef = this.dialog.open(ServiceFormDialogComponent, {
      width: '500px',
      data: { service },
    });

    dialogRef.afterClosed().subscribe((result: Service) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteMechanicDialog(service: Service): void {
    const dialogRef = this.dialog.open(ServiceDeleteDialogComponent, {
      width: '500px',
      data: { service },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && service?.id) {
        this.serviceService
          .deleteService(service.id)
          .subscribe((result) => {
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

  onSortChange(sort: Sort) {
    this.paginator.currentPage = 1;
    this.sort.field = sort.active;
    this.sort.order = sort.direction;
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
