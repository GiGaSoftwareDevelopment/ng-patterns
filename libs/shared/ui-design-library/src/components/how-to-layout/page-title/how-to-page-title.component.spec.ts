import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPageTitleComponent } from './how-to-page-title.component';

describe('HowToPageTitleComponent', () => {
  let component: HowToPageTitleComponent;
  let fixture: ComponentFixture<HowToPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToPageTitleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
