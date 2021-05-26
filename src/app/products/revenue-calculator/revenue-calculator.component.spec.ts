import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueCalculatorComponent } from './revenue-calculator.component';

describe('RevenueCalculatorComponent', () => {
  let component: RevenueCalculatorComponent;
  let fixture: ComponentFixture<RevenueCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
