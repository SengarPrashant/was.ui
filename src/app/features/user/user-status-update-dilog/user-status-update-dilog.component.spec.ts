import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusUpdateDilogComponent } from './user-status-update-dilog.component';

describe('UserStatusUpdateDilogComponent', () => {
  let component: UserStatusUpdateDilogComponent;
  let fixture: ComponentFixture<UserStatusUpdateDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStatusUpdateDilogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserStatusUpdateDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
