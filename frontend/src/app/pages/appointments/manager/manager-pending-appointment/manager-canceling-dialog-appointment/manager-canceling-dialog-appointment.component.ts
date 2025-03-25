import { Component } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';

@Component({
  selector: 'app-manager-canceling-dialog-appointment',
  imports: [MaterialModule],
  templateUrl: './manager-canceling-dialog-appointment.component.html',
  styleUrl: './manager-canceling-dialog-appointment.component.scss'
})
export class ManagerCancelingDialogAppointmentComponent {
  
  
  handleCancelAppointment(appointment: Appointment) {

  }
}
