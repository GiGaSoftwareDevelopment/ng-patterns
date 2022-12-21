import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BulletChartSampleComponent} from './bullet-chart-sample.component';

describe('BulletChartComponent', () => {
  let component: BulletChartSampleComponent;
  let fixture: ComponentFixture<BulletChartSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletChartSampleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BulletChartSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
