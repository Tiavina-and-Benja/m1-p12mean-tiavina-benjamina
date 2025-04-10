import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartsToServiceDialogComponent } from './add-parts-to-service-dialog.component';

describe('AddPartsToServiceDialogComponent', () => {
  let component: AddPartsToServiceDialogComponent;
  let fixture: ComponentFixture<AddPartsToServiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPartsToServiceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartsToServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
