import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardAppointmentComponent } from './client-card-appointment.component';

describe('ClientCardAppointmentComponent', () => {
  let component: ClientCardAppointmentComponent;
  let fixture: ComponentFixture<ClientCardAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCardAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCardAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
