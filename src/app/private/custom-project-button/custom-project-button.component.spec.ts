import { ComponentFixture, TestBed } from '@angular/core/testing';

import { customProjectButton } from './custom-project-button.component';

describe('customProjectButton', () => {
  let component: customProjectButton;
  let fixture: ComponentFixture<customProjectButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [customProjectButton]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(customProjectButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
