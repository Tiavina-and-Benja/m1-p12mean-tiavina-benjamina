import { Routes } from '@angular/router';
import { ManagerAppointmentComponent } from './manager-appointment/manager-appointment.component';
import { ManagerDetailAppointmentComponent } from './manager-detail-appointment/manager-detail-appointment.component';

export const ManagerAppointmentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ManagerAppointmentComponent,
      },

      {
        path: 'detail/:id',
        component: ManagerDetailAppointmentComponent,
      },
    ],
  },
];
