import { Component, signal } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '@app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
  options = this.settings.getOptions();
  hide = signal(true);
  isLoading: boolean = false;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private settings: CoreService,
    private router: Router,
    private authService: AuthService
  ) {}

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  onRegister() {
    if (this.form.invalid) return;
    const { first_name, last_name, email, phone, password } = this.form.value;
    this.isLoading = true;
    this.authService
      .register({ first_name, last_name, email, phone, password })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          if (err.error?.errors) {
            const apiErrors = err.error.errors;
            Object.keys(apiErrors).forEach((field) => {
              const formField = field as keyof typeof this.f;
              if (this.f[formField]) {
                this.f[formField].setErrors({ apiError: apiErrors[field] });
              }
            });
            this.isLoading = false;
          }
        },
      });
  }
}
