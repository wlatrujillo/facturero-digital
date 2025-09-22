import { TestBed } from '@angular/core/testing';

import { TaxValueService } from './tax-value.service';

describe('TaxValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxValueService = TestBed.get(TaxValueService);
    expect(service).toBeTruthy();
  });
});
