import { TestBed } from '@angular/core/testing';

import { SeatMapService } from './seat-map.service';

describe('SeatMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeatMapService = TestBed.get(SeatMapService);
    expect(service).toBeTruthy();
  });
});
