import { TestBed } from '@angular/core/testing';

import { OrderSignalrService } from './order-signalr.service';

describe('OrderSignalrService', () => {
  let service: OrderSignalrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSignalrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
