import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncidentRequestComponent } from './create-incident-request.component';

describe('CreateIncidentRequestComponent', () => {
  let component: CreateIncidentRequestComponent;
  let fixture: ComponentFixture<CreateIncidentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIncidentRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIncidentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
