import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailAppointmentComponent } from './client-detail-appointment.component';

describe('ClientDetailAppointmentComponent', () => {
  let component: ClientDetailAppointmentComponent;
  let fixture: ComponentFixture<ClientDetailAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDetailAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
