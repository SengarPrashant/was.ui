import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPermitWrapperComponent } from './work-permit-wrapper.component';

describe('WorkPermitWrapperComponent', () => {
  let component: WorkPermitWrapperComponent;
  let fixture: ComponentFixture<WorkPermitWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPermitWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkPermitWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
