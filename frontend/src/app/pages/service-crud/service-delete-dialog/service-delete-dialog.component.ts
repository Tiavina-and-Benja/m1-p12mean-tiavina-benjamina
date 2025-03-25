import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { Service } from '@app/models/service.model';

@Component({
  selector: 'app-service-delete-dialog',
  imports: [MaterialModule],
  templateUrl: './service-delete-dialog.component.html',
  styleUrl: './service-delete-dialog.component.scss',
})
export class ServiceDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServiceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {service: Service},
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}
