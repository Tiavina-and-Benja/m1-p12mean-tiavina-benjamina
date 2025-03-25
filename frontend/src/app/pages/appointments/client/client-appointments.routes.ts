import { Routes } from '@angular/router';
import { ClientAppointmentsComponent } from './client-appointment/client-appointment.component';
import { ClientBookingAppointmentComponent } from './client-booking-appointment/client-booking-appointment.component';
import { ClientDetailAppointmentComponent } from './client-detail-appointment/client-detail-appointment.component';

export const ClientAppointmentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClientAppointmentsComponent,
      },
      {
        path: 'book',
        component: ClientBookingAppointmentComponent
      },
      {
        path: 'detail/:id',
        component: ClientDetailAppointmentComponent
      }
    ],
  },
];
