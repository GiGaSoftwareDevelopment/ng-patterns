import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DensityComponent} from './density.component';

describe('DensityComponent', () => {
  let component: DensityComponent;
  let fixture: ComponentFixture<DensityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DensityComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DensityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
