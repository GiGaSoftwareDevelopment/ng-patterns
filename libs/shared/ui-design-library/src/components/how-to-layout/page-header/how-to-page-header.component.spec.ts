import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPageHeaderComponent } from './how-to-page-header.component';

describe('HowToPageHeaderComponent', () => {
  let component: HowToPageHeaderComponent;
  let fixture: ComponentFixture<HowToPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowToPageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HowToPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
