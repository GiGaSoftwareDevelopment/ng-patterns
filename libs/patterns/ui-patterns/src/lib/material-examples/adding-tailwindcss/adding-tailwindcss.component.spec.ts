import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTailwindcssComponent } from './adding-tailwindcss.component';

describe('AddingTailwindcssComponent', () => {
  let component: AddingTailwindcssComponent;
  let fixture: ComponentFixture<AddingTailwindcssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingTailwindcssComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AddingTailwindcssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
