import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatSidenavMenuComponent} from './ng-pat-sidenav-menu.component';

describe('SidenavMenuComponent', () => {
  let component: NgPatSidenavMenuComponent;
  let fixture: ComponentFixture<NgPatSidenavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatSidenavMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatSidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
