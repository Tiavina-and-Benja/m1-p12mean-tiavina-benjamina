import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAddDialogComponent } from './mechanic-add-dialog.component';

describe('MechanicAddDialogComponent', () => {
  let component: MechanicAddDialogComponent;
  let fixture: ComponentFixture<MechanicAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
