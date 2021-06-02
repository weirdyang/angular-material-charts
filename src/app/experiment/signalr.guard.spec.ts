import { TestBed } from '@angular/core/testing';

import { SignalrGuard } from './signalr.guard';

describe('SignalrGuard', () => {
  let guard: SignalrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignalrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
