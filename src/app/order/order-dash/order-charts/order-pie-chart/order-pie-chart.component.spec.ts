import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPieChartComponent } from './order-pie-chart.component';

describe('OrderPieChartComponent', () => {
  let component: OrderPieChartComponent;
  let fixture: ComponentFixture<OrderPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
