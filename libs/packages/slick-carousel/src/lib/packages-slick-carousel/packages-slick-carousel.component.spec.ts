import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackagesSlickCarouselComponent } from './packages-slick-carousel.component';

describe('PackagesSlickCarouselComponent', () => {
  let component: PackagesSlickCarouselComponent;
  let fixture: ComponentFixture<PackagesSlickCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesSlickCarouselComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PackagesSlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
