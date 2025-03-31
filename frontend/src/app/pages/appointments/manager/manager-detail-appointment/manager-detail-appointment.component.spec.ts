import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDetailAppointmentComponent } from './manager-detail-appointment.component';

describe('ManagerDetailAppointmentComponent', () => {
  let component: ManagerDetailAppointmentComponent;
  let fixture: ComponentFixture<ManagerDetailAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDetailAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDetailAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
