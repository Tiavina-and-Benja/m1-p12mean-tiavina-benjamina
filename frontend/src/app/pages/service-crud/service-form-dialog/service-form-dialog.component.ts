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
import { Service } from '@app/models/service.model';
import { ServiceService } from '@app/services/service.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-service-form-dialog',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './service-form-dialog.component.html',
  styleUrl: './service-form-dialog.component.scss',
})
export class ServiceFormDialogComponent {
  serviceForm: FormGroup;
  dialogTitle = 'Ajouter un service';
  isEditMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServiceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service?: Service },
    private serviceService: ServiceService
  ) {
    this.isEditMode = !!data?.service;
    this.dialogTitle = this.isEditMode
      ? 'Modifier le service'
      : 'Ajouter un service';
    this.serviceForm = this.fb.group({
      name: [data?.service?.name || '', [Validators.required]],
      price: [data?.service?.price || 0, [Validators.required]],
      description: [data?.service?.description || '', []],
    });
  }

  onSubmit() {
    if (!this.serviceForm.valid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const serviceData: Service = {
      ...this.serviceForm.value,
    };

    console.log("EDIT_MODE", this.isEditMode);
    console.log("EDIT_MODE_ID", this.data?.service?.id);
    if (this.isEditMode && this.data?.service?.id) {
      serviceData.id = this.data.service.id;
      this.serviceService
        .updateService(serviceData.id, serviceData)
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
      this.serviceService
        .addService(serviceData)
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
    const control = this.serviceForm.get(controlName);

    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }

    if (controlName === 'name' && control?.hasError('name')) {
      return 'Nom invalide';
    }

    if (controlName === 'price' && control?.hasError('price')) {
      return 'Prix invalide';
    }

    return '';
  }
}
