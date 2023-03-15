import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatColorPickerComponent} from './ng-pat-color-picker.component';

describe('NgPatColorPickerComponent', () => {
  let component: NgPatColorPickerComponent;
  let fixture: ComponentFixture<NgPatColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgPatColorPickerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPatColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
