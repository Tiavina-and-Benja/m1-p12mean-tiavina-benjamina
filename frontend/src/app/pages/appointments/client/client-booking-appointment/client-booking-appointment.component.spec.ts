import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBookingAppointmentComponent } from './client-booking-appointment.component';

describe('ClientBookingAppointmentComponent', () => {
  let component: ClientBookingAppointmentComponent;
  let fixture: ComponentFixture<ClientBookingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBookingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBookingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
