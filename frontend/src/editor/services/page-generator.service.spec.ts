import { TestBed } from '@angular/core/testing';

import { PageGeneratorService } from './page-generator.service';

describe('PageGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageGeneratorService = TestBed.get(PageGeneratorService);
    expect(service).toBeTruthy();
  });
});
