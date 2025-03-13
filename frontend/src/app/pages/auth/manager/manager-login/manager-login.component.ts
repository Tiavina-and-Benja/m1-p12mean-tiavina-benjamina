import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-manager-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './manager-login.component.html',
  styleUrl: './manager-login.component.scss',
})
export class ManagerLoginComponent {
  email: FormControl = new FormControl('tiavinaramia.manager@gmail.com', [Validators.required]);
  password: FormControl = new FormControl('123', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService
      .login(this.email.value || '', this.password.value || '', 'manager')
      .subscribe({
        next: (response) => {
          const { token } = response;
          localStorage.setItem('token', token);
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
