import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerSendgridEmailComponent } from './trigger-sendgrid-email.component';

describe('TriggerSendgridEmailComponent', () => {
  let component: TriggerSendgridEmailComponent;
  let fixture: ComponentFixture<TriggerSendgridEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerSendgridEmailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TriggerSendgridEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
