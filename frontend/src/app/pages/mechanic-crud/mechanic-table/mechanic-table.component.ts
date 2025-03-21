import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-mechanic-table',
  imports: [MaterialModule],
  templateUrl: './mechanic-table.component.html',
  styleUrls: ['./mechanic-table.component.scss']
})
export class MechanicTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'actions'];
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions!: number[];

  @Output() onSortChange = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  @Output() editMechanic = new EventEmitter<any>();
  @Output() deleteMechanic = new EventEmitter<any>();

  constructor() {}

  handleSortChange(event: Sort) {
    this.onSortChange.emit(event);
  }

  handlePageChange(event: PageEvent) {
    this.onPageChange.emit(event);
  }
}
