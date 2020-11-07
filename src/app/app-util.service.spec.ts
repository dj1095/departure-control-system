import { TestBed } from '@angular/core/testing';

import { AppUtilService } from './app-util.service';

describe('AppUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppUtilService = TestBed.get(AppUtilService);
    expect(service).toBeTruthy();
  });
});
