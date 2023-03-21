import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSectionContentComponent } from './how-to-section-content.component';

describe('HowToSectionContentComponent', () => {
  let component: HowToSectionContentComponent;
  let fixture: ComponentFixture<HowToSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToSectionContentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
