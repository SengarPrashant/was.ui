import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequstWorkflowComponent } from './requst-workflow.component';

describe('RequstWorkflowComponent', () => {
  let component: RequstWorkflowComponent;
  let fixture: ComponentFixture<RequstWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequstWorkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequstWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
