import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BulletChartTooltipComponent} from './bullet-chart-tooltip.component';

describe('BulletChartTooltipComponent', () => {
  let component: BulletChartTooltipComponent;
  let fixture: ComponentFixture<BulletChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulletChartTooltipComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
