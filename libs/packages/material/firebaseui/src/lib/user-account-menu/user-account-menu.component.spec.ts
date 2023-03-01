import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAccountMenuComponent} from './user-account-menu.component';

describe('UserAccountMenuComponent', () => {
  let component: UserAccountMenuComponent;
  let fixture: ComponentFixture<UserAccountMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAccountMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
