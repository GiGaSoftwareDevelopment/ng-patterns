import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppLoginPageComponent} from './app-login-page.component';

describe('AppLoginPageComponent', () => {
  let component: AppLoginPageComponent;
  let fixture: ComponentFixture<AppLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoginPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
