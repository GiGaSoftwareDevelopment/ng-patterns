import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightTypescriptComponent } from './highlight-typescript.component';

describe('HighlightTypescriptComponent', () => {
  let component: HighlightTypescriptComponent;
  let fixture: ComponentFixture<HighlightTypescriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightTypescriptComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightTypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
