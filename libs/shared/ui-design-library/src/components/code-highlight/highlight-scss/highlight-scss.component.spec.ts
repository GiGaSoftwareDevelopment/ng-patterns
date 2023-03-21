import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightScssComponent } from './highlight-scss.component';

describe('HighlightScssComponent', () => {
  let component: HighlightScssComponent;
  let fixture: ComponentFixture<HighlightScssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightScssComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightScssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
