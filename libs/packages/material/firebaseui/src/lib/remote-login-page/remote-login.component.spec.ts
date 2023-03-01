import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RemoteLoginComponent} from './remote-login.component';

describe('LoginComponent', () => {
  let component: RemoteLoginComponent;
  let fixture: ComponentFixture<RemoteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoteLoginComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
