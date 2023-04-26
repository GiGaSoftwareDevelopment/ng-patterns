import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgPatAppIdleOfflineComponent } from './ng-pat-app-idle-offline.component';

describe('AppIdleComponent', () => {
  let component: NgPatAppIdleOfflineComponent;
  let fixture: ComponentFixture<NgPatAppIdleOfflineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatAppIdleOfflineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatAppIdleOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
