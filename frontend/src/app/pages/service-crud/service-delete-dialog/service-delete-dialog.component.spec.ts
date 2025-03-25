import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDeleteDialogComponent } from './service-delete-dialog.component';

describe('ServiceDeleteDialogComponent', () => {
  let component: ServiceDeleteDialogComponent;
  let fixture: ComponentFixture<ServiceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
