import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { Appointment } from '@app/models/appointment.model';
import { Message } from '@app/models/message.model';
import { Vehicle } from '@app/models/vehicle.model';
import { AppointmentService } from '@app/services/appointment.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-chat',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  role: string | null = null;
  myId: string | null = null;
  appointments: Appointment[];
  actualAppointment: Appointment;
  messages: Message[] = [];

  newMessage: string = '';

  
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.myId = this.authService.getUserId();
    this.authService.role$.subscribe((role) => {
      this.role = role;
    });
    if (this.role === 'mecanicien') {
      this.appointmentService
        .getMechanicsAppointments(1, 10, 'date', 'desc')
        .subscribe((result) => {
          this.appointments = result.docs;
          if (this.appointments.length !== 0) {
            this.actualAppointment = this.appointments[0];
            this.messages = this.actualAppointment.messages || [];
            
            setTimeout(() => this.scrollToBottom(), 100);
          }
        });
    } else {
      this.appointmentService
        .getClientAppointments(1, 10, 'date', 'desc')
        .subscribe((result) => {
          this.appointments = result.docs;
          if (this.appointments.length !== 0) {
            this.actualAppointment = this.appointments[0];
            this.messages = this.actualAppointment.messages || [];
            setTimeout(() => this.scrollToBottom(), 100);  
          }
        });
    }
  }

  sendMessage() {
    if (!this.actualAppointment?.id) return;
    if (this.newMessage.trim()) {
      this.appointmentService
        .sendMessage(this.actualAppointment.id, this.newMessage)
        .subscribe((result) => {
          this.messages = result.messages;
          this.newMessage = "";
        });
    }
  }

  extractVehicle(appointment: Appointment): Vehicle | null {
    if (appointment && typeof appointment.vehicleId === 'object') {
      return appointment.vehicleId as Vehicle;
    }
    return null;
  }

  isMyMessage(message: Message): boolean {
    // console.log(message.senderId.id + " === " + this.myId);
    if (typeof message.senderId === "object") {
      return message.senderId.id === this.myId;
    } else {
      return message.senderId === this.myId;
    }
  }
  
  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('scroll error', err);
    }
  }
}
