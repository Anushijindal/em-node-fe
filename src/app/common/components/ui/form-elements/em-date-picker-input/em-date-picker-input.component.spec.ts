import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmDatePickerInputComponent } from './em-date-picker-input.component';

describe('EmDatePickerInputComponent', () => {
  let component: EmDatePickerInputComponent;
  let fixture: ComponentFixture<EmDatePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmDatePickerInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmDatePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
