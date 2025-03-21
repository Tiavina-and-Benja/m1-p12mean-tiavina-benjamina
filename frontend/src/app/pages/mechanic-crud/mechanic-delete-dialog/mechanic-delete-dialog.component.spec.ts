import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicDeleteDialogComponent } from './mechanic-delete-dialog.component';

describe('MechanicDeleteDialogComponent', () => {
  let component: MechanicDeleteDialogComponent;
  let fixture: ComponentFixture<MechanicDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
