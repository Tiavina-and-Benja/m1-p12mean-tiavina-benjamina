import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCrudTableComponent } from './service-crud-table.component';

describe('ServiceCrudTableComponent', () => {
  let component: ServiceCrudTableComponent;
  let fixture: ComponentFixture<ServiceCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCrudTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
