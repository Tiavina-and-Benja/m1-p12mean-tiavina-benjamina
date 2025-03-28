import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { MechanicCrudComponent } from './pages/mechanic-crud/mechanic-crud.component';
import { ServiceCrudComponent } from './pages/service-crud/service-crud.component';

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
        path: 'client/appointments',
        loadChildren: () =>
          import('./pages/appointments/client/client-appointments.routes').then(
            (m) => m.ClientAppointmentsRoutes
          ),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'manager/appointments',
        loadChildren: () =>
          import(
            './pages/appointments/manager/manager-appointments.routes'
          ).then((m) => m.ManagerAppointmentsRoutes),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['manager'] },
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
