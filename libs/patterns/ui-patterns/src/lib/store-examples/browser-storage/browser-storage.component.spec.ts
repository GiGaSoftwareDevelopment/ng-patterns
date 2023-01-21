import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowserStorageComponent} from './browser-storage.component';

describe('BrowserStorageComponent', () => {
  let component: BrowserStorageComponent;
  let fixture: ComponentFixture<BrowserStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserStorageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowserStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
