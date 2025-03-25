import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPendingAppointmentComponent } from './manager-pending-appointment.component';

describe('ManagerPendingAppointmentComponent', () => {
  let component: ManagerPendingAppointmentComponent;
  let fixture: ComponentFixture<ManagerPendingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPendingAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerPendingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
