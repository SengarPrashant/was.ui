import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkPermitRequestComponent } from './create-work-permit-request.component';

describe('CreateWorkPermitRequestComponent', () => {
  let component: CreateWorkPermitRequestComponent;
  let fixture: ComponentFixture<CreateWorkPermitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkPermitRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorkPermitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
