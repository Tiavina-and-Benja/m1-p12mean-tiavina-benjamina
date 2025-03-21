import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@app/material.module';

import { User } from '@models/user.model';

import { MechanicAddDialogComponent } from './mechanic-add-dialog/mechanic-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { MechanicService } from '@services/mechanic.service';

import { Sort } from '@angular/material/sort';
import { MechanicTableComponent } from './mechanic-table/mechanic-table.component';
import { MechanicDeleteDialogComponent } from './mechanic-delete-dialog/mechanic-delete-dialog.component';

import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-mechanic-crud',
  imports: [FormsModule, MaterialModule, MechanicTableComponent],
  templateUrl: './mechanic-crud.component.html',
  styleUrl: './mechanic-crud.component.scss',
})
export class MechanicCrudComponent {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'actions',
  ];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;
  userForm: FormGroup;
  hidePassword = true;
  isEditMode = false;
  dialogTitle = 'Ajouter un utilisateur';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  sortField: string = '';
  sortOrder: string = 'asc';
  pageSizeOptions: number[] = [5, 10, 20];
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
    private mechanicService: MechanicService
  ) {
    this.dataSource = new MatTableDataSource<User>([]);
  }

  ngOnInit(): void {
    this.loadMechanics();
  }

  loadMechanics() {
    this.mechanicService
      .getPaginated(
        this.currentPage,
        this.pageSize,
        this.sortField,
        this.sortOrder,
        this.searchTerm
      )
      .subscribe((data) => {
        this.dataSource.data = data.docs;
        this.totalItems = data.totalDocs;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    this.loadMechanics();
  }

  openAddMechanicDialog(): void {
    const dialogRef = this.dialog.open(MechanicAddDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.loadMechanics();
      }
    });
  }

  openEditMechanicDialog(user: User): void {
    const dialogRef = this.dialog.open(MechanicAddDialogComponent, {
      width: '500px',
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        console.log('Mécanicien à mettre à jour:', result);
        // this.userService.updateUser(result).subscribe(...);
      }
    });
  }

  openDeleteMechanicDialog(user: User): void {
    const dialogRef = this.dialog.open(MechanicDeleteDialogComponent, {
      width: '500px',
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        console.log('Mécanicien à été supprimé:', result);
        // this.userService.updateUser(result).subscribe(...);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFullName(user: User): string {
    return `${user.first_name || ''} ${user.last_name || ''}`.trim();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;

    this.loadMechanics();
  }

  onSortChange(sort: Sort) {
    this.currentPage = 1;
    this.sortField = sort.active;
    this.sortOrder = sort.direction;

    this.loadMechanics();
  }

  onSearch() {
    this.currentPage = 1;
    this.loadMechanics(); 
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadMechanics(); 
  }
}
