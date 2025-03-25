import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';
import { Service } from '@app/models/service.model';

@Component({
  selector: 'app-service-crud-table',
  imports: [MaterialModule, CommonModule],
  templateUrl: './service-crud-table.component.html',
  styleUrl: './service-crud-table.component.scss',
})
export class ServiceCrudTableComponent {
  @Input() dataSource!: MatTableDataSource<Service>;
  @Input() displayedColumns: string[] = ['name', 'price', 'description', 'actions'];
  @Input() totalItems!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions!: number[];

  @Output() onSortChange = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  handleSortChange(event: Sort) {
    this.onSortChange.emit(event);
  }

  handlePageChange(event: PageEvent) {
    this.onPageChange.emit(event);
  }
}
