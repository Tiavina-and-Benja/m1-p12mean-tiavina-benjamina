import { Routes } from '@angular/router';

import { UserLoginComponent } from '../auth/user/user-login/user-login.component';
import { MechanicLoginComponent } from '../auth/mechanic/mechanic-login/mechanic-login.component';
import { ManagerLoginComponent } from '../auth/manager/manager-login/manager-login.component';
import { UserRegisterComponent } from '../auth/user/user-register/user-register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
      },
      {
        path: 'register',
        component: UserRegisterComponent,
      },
      {
        path: 'login/mecanicien',
        component: MechanicLoginComponent,
      },
      {
        path: 'login/manager',
        component: ManagerLoginComponent,
      },
    ],
  },
];
