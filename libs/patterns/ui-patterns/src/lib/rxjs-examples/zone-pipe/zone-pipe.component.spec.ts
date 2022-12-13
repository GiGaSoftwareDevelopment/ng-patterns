import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ZonePipeComponent} from './zone-pipe.component';

describe('ZonePipeComponent', () => {
  let component: ZonePipeComponent;
  let fixture: ComponentFixture<ZonePipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonePipeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ZonePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
