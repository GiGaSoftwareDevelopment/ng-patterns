import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UiuxBulletChartTooltipComponent} from './uiux-bullet-chart-tooltip.component';

describe('BulletChartTooltipComponent', () => {
  let component: UiuxBulletChartTooltipComponent;
  let fixture: ComponentFixture<UiuxBulletChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiuxBulletChartTooltipComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiuxBulletChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
