import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCrudComponent } from './vehicle-crud.component';

describe('VehicleCrudComponent', () => {
  let component: VehicleCrudComponent;
  let fixture: ComponentFixture<VehicleCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
