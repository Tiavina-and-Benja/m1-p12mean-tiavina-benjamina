import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerValidateAppointmentComponent } from './manager-validate-appointment.component';

describe('ManagerValidateAppointmentComponent', () => {
  let component: ManagerValidateAppointmentComponent;
  let fixture: ComponentFixture<ManagerValidateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerValidateAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerValidateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
