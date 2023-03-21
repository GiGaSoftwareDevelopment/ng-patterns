import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightHtmlComponent } from './highlight-html.component';

describe('HighlightHtmlComponent', () => {
  let component: HighlightHtmlComponent;
  let fixture: ComponentFixture<HighlightHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightHtmlComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
