import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { User } from '@app/models/user.model';
import { AppointmentService } from '@app/services/appointment.service';
import { MechanicService } from '@app/services/mechanic.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-add-mechanic-to-appointment-dialog',
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './add-mechanic-to-appointment-dialog.component.html',
  styleUrl: './add-mechanic-to-appointment-dialog.component.scss',
})
export class AddMechanicToAppointmentDialogComponent implements OnInit {
  searchText: string = '';
  searchSubject = new Subject<string>();
  mechanics: User[];
  selectedMechanic: User[] = [];
  appointmentId: string;

  constructor(
    private dialogRef: MatDialogRef<AddMechanicToAppointmentDialogComponent>,
    private mechanicService: MechanicService,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: { appointmentId?: string }
  ) {
    if (data.appointmentId) {
      this.appointmentId = data.appointmentId;
    }
  }

  ngOnInit(): void {
    this.loadData('');
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchTerm) => {
      this.loadData(searchTerm);
    });
  }

  loadData(search: string): void {
    this.mechanicService
      .getPaginated(1, 5, 'first_name', 'asc', search)
      .subscribe((result) => {
        if (result) this.mechanics = result.docs;
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchText);
  }

  onToggleMechanics(mechanic: User) {
    const index = this.selectedMechanic.findIndex((s) => s.id === mechanic.id);
    if (index === -1) {
      this.selectedMechanic.push(mechanic);
    } else {
      this.selectedMechanic.splice(index, 1);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log("ON_CLOSING"); 
    try {
      const mechanicIds = this.selectedMechanic
        .map((user) => user.id)
        .filter((id) => id !== undefined);
      this.appointmentService.addMechanicsToAppointment(
        this.appointmentId,
        mechanicIds
      ).subscribe(result => {
        this.dialogRef.close(this.selectedMechanic);
      });
    } catch (error) {
      console.error("ADD MECHANIC TO APPOINTEMENT ERROR", error);
    }
  }

  isValid(): boolean {
    return this.selectedMechanic.length === 0;
  }

  isSelected(mechanic: User): boolean {
    return this.selectedMechanic.some((s) => s.id === mechanic.id);
  }

  getFullInformation(user: User): string {
    return `${user.first_name} ${user.last_name} (${user.phone}, ${user.email})`;
  }
}
