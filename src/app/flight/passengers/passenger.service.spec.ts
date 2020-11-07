import { TestBed } from '@angular/core/testing';

import { PassengerService } from './passenger.service';

describe('PassengerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassengerService = TestBed.get(PassengerService);
    expect(service).toBeTruthy();
  });
});
