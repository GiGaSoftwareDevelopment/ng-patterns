import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlickCarouselComponent } from './my-button.component';

describe('SlickCarouselComponent', () => {
  let component: SlickCarouselComponent;
  let fixture: ComponentFixture<SlickCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlickCarouselComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createNxNgMatPrototype', () => {
    expect(component).toBeTruthy();
  });
});
