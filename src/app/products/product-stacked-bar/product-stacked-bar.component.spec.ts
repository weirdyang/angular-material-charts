import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStackedBarComponent } from './product-stacked-bar.component';

describe('ProductStackedBarComponent', () => {
  let component: ProductStackedBarComponent;
  let fixture: ComponentFixture<ProductStackedBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStackedBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStackedBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
