import { ComponentFixture, TestBed } from '@angular/core/testing';

import { deleteProjectButton } from './custom-project-button.component';

describe('deleteProjectButton', () => {
  let component: deleteProjectButton;
  let fixture: ComponentFixture<deleteProjectButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [deleteProjectButton]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(deleteProjectButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
