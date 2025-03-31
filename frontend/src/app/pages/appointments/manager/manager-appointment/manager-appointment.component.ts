import { Component } from '@angular/core';
import { ManagerCardAppointmentComponent } from "./manager-card-appointment/manager-card-appointment.component";
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-manager-appointment',
  imports: [ManagerCardAppointmentComponent, MaterialModule],
  templateUrl: './manager-appointment.component.html',
  styleUrl: './manager-appointment.component.scss'
})
export class ManagerAppointmentComponent {

}
