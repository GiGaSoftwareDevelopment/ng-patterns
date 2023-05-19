import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlickExampleComponent } from './slick-example.component';

describe('SlickExampleComponent', () => {
  let component: SlickExampleComponent;
  let fixture: ComponentFixture<SlickExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlickExampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SlickExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
