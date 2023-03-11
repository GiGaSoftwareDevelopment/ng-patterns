import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatLogoComponent} from './ng-pat-logo.component';

describe('NgPatLogoComponent', () => {
  let component: NgPatLogoComponent;
  let fixture: ComponentFixture<NgPatLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
