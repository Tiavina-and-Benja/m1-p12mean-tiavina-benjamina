import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicTableComponent } from './mechanic-table.component';

describe('MechanicTableComponent', () => {
  let component: MechanicTableComponent;
  let fixture: ComponentFixture<MechanicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
