import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceToBookingAppointmentDialogComponent } from './add-service-to-booking-appointment-dialog.component';

describe('AddServiceToBookingAppointmentDialogComponent', () => {
  let component: AddServiceToBookingAppointmentDialogComponent;
  let fixture: ComponentFixture<AddServiceToBookingAppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceToBookingAppointmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceToBookingAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
