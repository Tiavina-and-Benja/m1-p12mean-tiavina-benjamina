import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { MechanicCrudComponent } from './pages/mechanic-crud/mechanic-crud.component';

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
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
        canActivate: [RoleGuard],
        data: {roles: ['user', 'mecanicien']}
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
        canActivate: [RoleGuard],
        data: {roles: ['manager']}
      },
      {
        path: 'manager',
        children: [
          {
            path: 'mechanics',
            component: MechanicCrudComponent,
          }
        ],
        canActivate: [RoleGuard],
        data: {roles: ['manager']}
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
        canActivate: [NotAuthGuard]
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/error',
  },
];
