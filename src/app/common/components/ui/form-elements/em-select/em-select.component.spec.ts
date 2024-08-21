import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmSelectComponent } from './em-select.component';

describe('EmSelectComponent', () => {
  let component: EmSelectComponent;
  let fixture: ComponentFixture<EmSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
