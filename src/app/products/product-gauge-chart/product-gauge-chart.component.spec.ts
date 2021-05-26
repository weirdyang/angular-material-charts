import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGaugeChartComponent } from './product-gauge-chart.component';

describe('ProductGaugeChartComponent', () => {
  let component: ProductGaugeChartComponent;
  let fixture: ComponentFixture<ProductGaugeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGaugeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
