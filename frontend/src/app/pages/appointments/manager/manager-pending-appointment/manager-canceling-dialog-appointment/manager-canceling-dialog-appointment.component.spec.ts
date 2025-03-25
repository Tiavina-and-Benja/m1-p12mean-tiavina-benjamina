import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCancelingDialogAppointmentComponent } from './manager-canceling-dialog-appointment.component';

describe('ManagerCancelingDialogAppointmentComponent', () => {
  let component: ManagerCancelingDialogAppointmentComponent;
  let fixture: ComponentFixture<ManagerCancelingDialogAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCancelingDialogAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCancelingDialogAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
