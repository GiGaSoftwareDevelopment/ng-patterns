import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatternsLogoComponent} from './ng-patterns-logo.component';

describe('NgPatternsLogoComponent', () => {
  let component: NgPatternsLogoComponent;
  let fixture: ComponentFixture<NgPatternsLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatternsLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatternsLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
