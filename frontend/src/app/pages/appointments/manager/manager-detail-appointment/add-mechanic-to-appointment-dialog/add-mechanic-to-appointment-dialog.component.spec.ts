import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMechanicToAppointmentDialogComponent } from './add-mechanic-to-appointment-dialog.component';

describe('AddMechanicToAppointmentDialogComponent', () => {
  let component: AddMechanicToAppointmentDialogComponent;
  let fixture: ComponentFixture<AddMechanicToAppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMechanicToAppointmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMechanicToAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
