import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgPatBulletChartTooltipComponent} from './ng-pat-bullet-chart-tooltip.component';

describe('BulletChartTooltipComponent', () => {
  let component: NgPatBulletChartTooltipComponent;
  let fixture: ComponentFixture<NgPatBulletChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgPatBulletChartTooltipComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgPatBulletChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
