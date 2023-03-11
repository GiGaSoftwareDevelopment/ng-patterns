import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatternsLogoWithTextComponent} from './ng-patterns-logo-with-text.component';

describe('NgPatternsLogoComponent', () => {
  let component: NgPatternsLogoWithTextComponent;
  let fixture: ComponentFixture<NgPatternsLogoWithTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgPatternsLogoWithTextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgPatternsLogoWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
