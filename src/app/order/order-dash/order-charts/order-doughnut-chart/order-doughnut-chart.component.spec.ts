import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDoughnutChartComponent } from './order-doughnut-chart.component';

describe('OrderDoughnutChartComponent', () => {
  let component: OrderDoughnutChartComponent;
  let fixture: ComponentFixture<OrderDoughnutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDoughnutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
