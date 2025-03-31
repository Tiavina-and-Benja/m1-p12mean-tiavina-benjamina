import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-add-mechanic-to-appointment-dialog',
  imports: [MaterialModule, FormsModule],
  templateUrl: './add-mechanic-to-appointment-dialog.component.html',
  styleUrl: './add-mechanic-to-appointment-dialog.component.scss',
})
export class AddMechanicToAppointmentDialogComponent {
  searchQuery = '';
  mechanics: User[] = [
    {
      id: '1',
      first_name: 'Alice',
      last_name: 'Dupont',
      email: 'alice.dupont@example.com',
      phone: '0612345678',
      password: null,
    },
    {
      id: '2',
      first_name: 'Jean',
      last_name: 'Morel',
      email: 'jean.morel@example.com',
      phone: '0623456789',
      password: null,
    },
    {
      id: '3',
      first_name: 'Sophie',
      last_name: 'Laurent',
      email: 'sophie.laurent@example.com',
      phone: '0634567890',
      password: null,
    },
    {
      id: '4',
      first_name: 'Marc',
      last_name: 'Dubois',
      email: 'marc.dubois@example.com',
      phone: '0645678901',
      password: null,
    },
    {
      id: '5',
      first_name: 'Emma',
      last_name: 'Lemoine',
      email: 'emma.lemoine@example.com',
      phone: '0656789012',
      password: null,
    },
  ];
  selectedMechanic: User | null = null;

  constructor(
    private dialogRef: MatDialogRef<AddMechanicToAppointmentDialogComponent>
  ) {}

  selectMechanic(mech: User) {
    if (mech === null) return;
    this.selectedMechanic = mech;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.selectedMechanic);
  }
}
