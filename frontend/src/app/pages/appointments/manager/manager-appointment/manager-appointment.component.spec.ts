import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAppointmentComponent } from './manager-appointment.component';

describe('ManagerAppointmentComponent', () => {
  let component: ManagerAppointmentComponent;
  let fixture: ComponentFixture<ManagerAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
