import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCardAppointmentComponent } from './manager-card-appointment.component';

describe('ManagerCardAppointmentComponent', () => {
  let component: ManagerCardAppointmentComponent;
  let fixture: ComponentFixture<ManagerCardAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCardAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCardAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
