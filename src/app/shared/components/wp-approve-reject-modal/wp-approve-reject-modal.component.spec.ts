import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpApproveRejectModalComponent } from './wp-approve-reject-modal.component';

describe('WpApproveRejectModalComponent', () => {
  let component: WpApproveRejectModalComponent;
  let fixture: ComponentFixture<WpApproveRejectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WpApproveRejectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WpApproveRejectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
