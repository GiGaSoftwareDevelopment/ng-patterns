import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneTimeLoginIdComponent} from './one-time-login-id.component';

describe('OneTimeLoginIdComponent', () => {
  let component: OneTimeLoginIdComponent;
  let fixture: ComponentFixture<OneTimeLoginIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneTimeLoginIdComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OneTimeLoginIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
