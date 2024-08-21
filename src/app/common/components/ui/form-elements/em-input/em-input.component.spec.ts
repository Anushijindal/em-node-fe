import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmInputComponent } from './em-input.component';

describe('EmInputComponent', () => {
  let component: EmInputComponent;
  let fixture: ComponentFixture<EmInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
