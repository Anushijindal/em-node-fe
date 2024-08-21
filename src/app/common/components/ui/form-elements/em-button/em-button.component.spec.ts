import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmButtonComponent } from './em-button.component';

describe('EmButtonComponent', () => {
  let component: EmButtonComponent;
  let fixture: ComponentFixture<EmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
