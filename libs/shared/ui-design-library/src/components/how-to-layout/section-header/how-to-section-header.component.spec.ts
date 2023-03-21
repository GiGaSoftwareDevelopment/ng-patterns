import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToSectionHeaderComponent } from './how-to-section-header.component';

describe('HowToSectionHeaderComponent', () => {
  let component: HowToSectionHeaderComponent;
  let fixture: ComponentFixture<HowToSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToSectionHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
