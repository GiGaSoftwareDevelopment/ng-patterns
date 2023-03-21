import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightBashComponent } from './highlight-bash.component';

describe('HighlightBashComponent', () => {
  let component: HighlightBashComponent;
  let fixture: ComponentFixture<HighlightBashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightBashComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightBashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
