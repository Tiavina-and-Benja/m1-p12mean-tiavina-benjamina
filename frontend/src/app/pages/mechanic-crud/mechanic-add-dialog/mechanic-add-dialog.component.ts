// mechanic-add-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/models/user.model';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MechanicService } from '@app/services/mechanic.service';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-mechanic-add-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './mechanic-add-dialog.component.html',
  styleUrl: './mechanic-add-dialog.component.scss'
})
export class MechanicAddDialogComponent {
  userForm: FormGroup;
  hidePassword = true;
  isEditMode = false;
  dialogTitle = 'Ajouter un utilisateur';
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MechanicAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User },
    private mechanicService: MechanicService
  ) {
    this.isEditMode = !!data?.user;
    this.dialogTitle = this.isEditMode ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur';

    this.userForm = this.fb.group({
      first_name: [data?.user?.first_name || '', [Validators.required]],
      last_name: [data?.user?.last_name || '', [Validators.required]],
      email: [data?.user?.email || '', [Validators.required, Validators.email]],
      phone: [data?.user?.phone || '', [Validators.pattern(/^[0-9]{10}$/)]],
      password: [this.isEditMode ? '********' : '', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]]
    });

    // Désactiver le champ de mot de passe en mode édition par défaut
    if (this.isEditMode) {
      this.userForm.get('password')?.disable();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const userData: User = {
        ...this.userForm.value
      };

      if (this.isEditMode && this.data?.user?.id) {
        userData.id = this.data.user.id;
        
        // Si le mot de passe n'a pas été modifié en mode édition
        if (userData.password === '********') {
          delete userData.password;
        }
        
        // TODO: add update service
        console.log("ACTION_ON_UPDATE", userData);
        // this.userService.updateUser(userData)
        //   .pipe(
        //     catchError(error => {
        //       this.errorMessage = 'Erreur lors de la mise à jour: ' + (error.message || 'Erreur inconnue');
        //       return of(null);
        //     }),
        //     finalize(() => this.isLoading = false)
        //   )
        //   .subscribe(result => {
        //     if (result) {
        //       this.dialogRef.close(result);
        //     }
        //   });
      } else {
        this.mechanicService.addMechanic(userData)
          .pipe(
            catchError(error => {
              this.errorMessage = 'Erreur lors de l\'ajout: ' + (error.message || 'Erreur inconnue');
              return of(null);
            }),
            finalize(() => this.isLoading = false)
          )
          .subscribe(result => {
            if (result) {
              this.dialogRef.close(result);
            }
          });
      }
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  enablePasswordEdit(): void {
    this.userForm.get('password')?.enable();
    this.userForm.get('password')?.setValue('');
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    
    if (control?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Email invalide';
    }
    
    if (controlName === 'phone' && control?.hasError('pattern')) {
      return 'Numéro de téléphone invalide (10 chiffres requis)';
    }
    
    if (controlName === 'password' && control?.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    return '';
  }
}