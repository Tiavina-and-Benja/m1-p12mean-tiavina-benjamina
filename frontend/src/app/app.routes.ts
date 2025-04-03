import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { MechanicCrudComponent } from './pages/mechanic-crud/mechanic-crud.component';
import { ServiceCrudComponent } from './pages/service-crud/service-crud.component';
import { VehicleCrudComponent } from './pages/vehicle-crud/vehicle-crud.component';
import { VehiculeDetailComponent } from './pages/vehicule-crud/vehicule-detail/vehicule-detail.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AppointmentDetailComponent } from './pages/appointment-detail/appointment-detail.component';
import { ClientBookingAppointmentComponent } from './pages/appointments/client/client-booking-appointment/client-booking-appointment.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'manager',
        children: [
          {
            path: 'mechanics',
            component: MechanicCrudComponent,
          },
        ],
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
      },
      {
        path: 'manager/services',
        component: ServiceCrudComponent,
        canActivate: [RoleGuard],
        data: { roles: ['manager'] },
      },
      {
        path: 'vehicles',
        component: VehicleCrudComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'vehicles/:id',
        component: VehiculeDetailComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user', 'manager', 'mecanicien']}
      },
      {
        path: 'appointments/:id',
        component: AppointmentDetailComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user', 'manager', 'mecanicien']}
      },
      {
        path: 'book-appointment',
        component: ClientBookingAppointmentComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user']}
      },
      {
        path: 'appointments/:id',
        component: AppointmentDetailComponent,
        canActivate: [RoleGuard],
        data: { roles: ['user']}
      },
      {
        path: 'client/appointments',
        loadChildren: () =>
          import('./pages/appointments/client/client-appointments.routes').then(
            (m) => m.ClientAppointmentsRoutes
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then(
            (m) => m.AuthenticationRoutes
          ),
        canActivate: [NotAuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/error',
  },
];
