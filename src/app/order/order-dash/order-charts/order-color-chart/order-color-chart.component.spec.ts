import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderColorChartComponent } from './order-color-chart.component';

describe('OrderColorChartComponent', () => {
  let component: OrderColorChartComponent;
  let fixture: ComponentFixture<OrderColorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderColorChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderColorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
