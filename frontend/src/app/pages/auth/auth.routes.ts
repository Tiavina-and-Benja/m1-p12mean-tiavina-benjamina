import { Routes } from '@angular/router';

import { UserLoginComponent } from './user/user-login/user-login.component';
import { MechanicLoginComponent } from './mechanic/mechanic-login/mechanic-login.component';
import { ManagerLoginComponent } from './manager/manager-login/manager-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

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
