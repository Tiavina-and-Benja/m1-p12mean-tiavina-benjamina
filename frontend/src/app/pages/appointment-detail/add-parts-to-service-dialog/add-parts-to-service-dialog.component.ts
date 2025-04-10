import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { Part } from '@app/models/part.model';
import { AuthService } from '@app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-add-parts-to-service-dialog',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-parts-to-service-dialog.component.html',
  styleUrls: ['./add-parts-to-service-dialog.component.css'],
})
export class AddPartsToServiceDialogComponent implements OnInit{
  role: string | null = null;
  title: string = 'Définir les pièces'
  partForm!: FormGroup;
  appointmentId?: string;
  serviceId?: string;
  parts: Part[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddPartsToServiceDialogComponent>,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA)
    public data: { appointmentId?: string; serviceId?: string; parts: Part[] }
  ) {
    this.appointmentId = data.appointmentId || '';
    this.serviceId = data.serviceId || '';
    this.parts = data.parts;

    this.partForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }
  ngOnInit(): void {
    
    this.authService.role$.subscribe(role => {
      this.role = role;
      this.title = role === 'mecanicien' ? "Définir les pièces" : "Les pièces nécessaires"
    });
  }

  onSubmit() {
    if (this.partForm.valid) {
      const partData = this.partForm.value;
      this.parts.push(partData);
      this.partForm.reset();
      this.partForm.patchValue({ quantity: 1 });
    }
  }

  removePart(index: number) {
    this.parts.splice(index, 1);
  }

  onCancel() {
    this.dialogRef.close();
  }

  validate() {
    if (!this.appointmentId || !this.serviceId) return;
    this.appointmentService
      .addPartToService(this.appointmentId, this.serviceId, this.parts)
      .subscribe((result) => {
        this.dialogRef.close(this.parts);
      });
  }
}
