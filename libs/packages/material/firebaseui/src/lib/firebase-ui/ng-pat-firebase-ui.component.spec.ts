import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPatFirebaseUiComponent } from './ng-pat-firebase-ui.component';

describe('FirebaseUiComponent', () => {
  let component: NgPatFirebaseUiComponent;
  let fixture: ComponentFixture<NgPatFirebaseUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatFirebaseUiComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatFirebaseUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
