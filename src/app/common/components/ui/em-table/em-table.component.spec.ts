import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmTableComponent } from './em-table.component';

describe('EmTableComponent', () => {
  let component: EmTableComponent;
  let fixture: ComponentFixture<EmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
