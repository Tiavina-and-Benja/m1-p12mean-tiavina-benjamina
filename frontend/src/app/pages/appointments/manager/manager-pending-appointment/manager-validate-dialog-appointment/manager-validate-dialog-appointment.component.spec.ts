import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerValidateDialogAppointmentComponent } from './manager-validate-dialog-appointment.component';

describe('ManagerValidateDialogAppointmentComponent', () => {
  let component: ManagerValidateDialogAppointmentComponent;
  let fixture: ComponentFixture<ManagerValidateDialogAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerValidateDialogAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerValidateDialogAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
