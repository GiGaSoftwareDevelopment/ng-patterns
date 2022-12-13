import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BulletChartComponent} from './bullet-chart.component';

describe('BulletChartComponent', () => {
  let component: BulletChartComponent;
  let fixture: ComponentFixture<BulletChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BulletChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
