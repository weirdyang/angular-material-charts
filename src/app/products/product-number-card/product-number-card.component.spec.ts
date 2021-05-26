import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNumberCardComponent } from './product-number-card.component';

describe('ProductNumberCardComponent', () => {
  let component: ProductNumberCardComponent;
  let fixture: ComponentFixture<ProductNumberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductNumberCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
