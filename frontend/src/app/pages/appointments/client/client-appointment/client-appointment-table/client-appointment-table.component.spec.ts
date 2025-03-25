import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentTableComponent } from './client-appointment-table.component';

describe('ClientAppointmentTableComponent', () => {
  let component: ClientAppointmentTableComponent;
  let fixture: ComponentFixture<ClientAppointmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAppointmentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAppointmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
