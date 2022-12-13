import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GithubLogoComponent} from './github-logo.component';

describe('GithubLogoComponent', () => {
  let component: GithubLogoComponent;
  let fixture: ComponentFixture<GithubLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubLogoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
