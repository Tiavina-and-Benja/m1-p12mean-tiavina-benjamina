import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss',
})
export class UserLoginComponent {
  email: FormControl = new FormControl('tiavinaramia@gmail.com', [
    Validators.required,
  ]);
  password: FormControl = new FormControl('123', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.email.invalid || this.password.invalid) return;
    this.authService
      .login(this.email.value || '', this.password.value || '')
      .subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.error?.errors) {
            const apiErrors = err.error.errors;
            if (apiErrors.email) {
              this.email.setErrors({ apiError: apiErrors.email });
            }
            if (apiErrors.password)
              this.password.setErrors({ apiError: apiErrors.password });
          }
        },
      });
  }
}
