import { TestBed } from '@angular/core/testing';

import { WindServiceService } from './wind-service.service';

describe('WindServiceService', () => {
  let service: WindServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
