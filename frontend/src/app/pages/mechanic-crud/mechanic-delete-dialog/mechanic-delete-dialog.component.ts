import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-mechanic-delete-dialog',
  imports: [
    MaterialModule
  ],
  templateUrl: './mechanic-delete-dialog.component.html',
  styleUrl: './mechanic-delete-dialog.component.scss'
})
export class MechanicDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MechanicDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  getFullName(): string {
    return `${this.data.user.first_name || ''} ${this.data.user.last_name || ''}`.trim();
  }
}
