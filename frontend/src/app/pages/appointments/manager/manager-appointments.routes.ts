import { Routes } from '@angular/router';
import { ManagerPendingAppointmentComponent } from './manager-pending-appointment/manager-pending-appointment.component';

export const ManagerAppointmentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ManagerPendingAppointmentComponent
      }
    ],
  },
];
