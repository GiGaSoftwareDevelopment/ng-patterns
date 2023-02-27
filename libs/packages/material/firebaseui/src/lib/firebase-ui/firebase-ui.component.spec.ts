import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirebaseUiComponent} from './firebase-ui.component';

describe('FirebaseUiComponent', () => {
  let component: FirebaseUiComponent;
  let fixture: ComponentFixture<FirebaseUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseUiComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FirebaseUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
