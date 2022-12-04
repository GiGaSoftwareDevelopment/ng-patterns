import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PackagesNgrxDexieComponent} from './packages-ngrx-dexie.component';

describe('PackagesNgrxDexieComponent', () => {
  let component: PackagesNgrxDexieComponent;
  let fixture: ComponentFixture<PackagesNgrxDexieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesNgrxDexieComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PackagesNgrxDexieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
