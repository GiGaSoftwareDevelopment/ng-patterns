import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UiColorPickerComponent} from './uiux-color-picker.component';

describe('UiColorPickerComponent', () => {
  let component: UiColorPickerComponent;
  let fixture: ComponentFixture<UiColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiColorPickerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
