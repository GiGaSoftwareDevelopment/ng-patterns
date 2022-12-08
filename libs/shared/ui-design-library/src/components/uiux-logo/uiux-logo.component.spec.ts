import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UiuxLogoComponent} from './uiux-logo.component';

describe('UiuxLogoComponent', () => {
  let component: UiuxLogoComponent;
  let fixture: ComponentFixture<UiuxLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiuxLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UiuxLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
