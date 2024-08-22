import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmDisabledButtonComponent } from './em-disabled-button.component';

describe('EmDisabledButtonComponent', () => {
  let component: EmDisabledButtonComponent;
  let fixture: ComponentFixture<EmDisabledButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmDisabledButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmDisabledButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
