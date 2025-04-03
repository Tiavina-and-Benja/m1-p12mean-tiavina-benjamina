import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { Vehicle } from '@app/models/vehicle.model';
import { VehicleService } from '@app/services/vehicle.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-vehicle-form-dialog',
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrl: './vehicle-form-dialog.component.scss',
})
export class VehicleFormDialogComponent {
  vehicleForm: FormGroup;
  dialogTitle = 'Ajouter un véhicule';
  isEditMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle?: Vehicle },
    private vehicleService: VehicleService
  ) {
    this.isEditMode = !!data?.vehicle;
    this.dialogTitle = this.isEditMode
      ? 'Modifier le véhicule'
      : 'Ajouter un véhicule';
    this.vehicleForm = this.fb.group({
      marque: [data?.vehicle?.marque || '', [Validators.required]],
      modele: [data?.vehicle?.modele || '', [Validators.required]],
      annee: [data?.vehicle?.annee || '', [Validators.required]],
      immatriculation: [data?.vehicle?.immatriculation || '', [Validators.required]],
      type_carburant: [data?.vehicle?.type_carburant || '', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.vehicleForm.valid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const vehicleData: Vehicle = {
      ...this.vehicleForm.value,
    };
    console.log('EDIT_MODE', this.isEditMode);
    console.log('DATA', this.data);
    if (this.isEditMode && this.data?.vehicle?.id) {
      vehicleData.id = this.data.vehicle.id;
      this.vehicleService
        .updateVehicle(vehicleData.id, vehicleData)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              'Erreur lors de la mise à jour: ' +
              (error.message || 'Erreur inconnue');
            return of(null);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close(result);
          }
        });
    } else {
      this.vehicleService
        .addVehicle(vehicleData)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              "Erreur lors de l'ajout: " + (error.message || 'Erreur inconnue');
            return of(null);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe((result) => {
          if (result) {
            this.dialogRef.close(result);
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.vehicleForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }

    if (controlName === 'name' && control?.hasError('name')) {
      return 'Nom invalide';
    }
    // TODO: complete error

    return '';
  }
}
