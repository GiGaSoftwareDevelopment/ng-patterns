import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavItemLinkComponent} from './nav-item-link.component';

describe('NavItemLinkComponent', () => {
  let component: NavItemLinkComponent;
  let fixture: ComponentFixture<NavItemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemLinkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NavItemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
