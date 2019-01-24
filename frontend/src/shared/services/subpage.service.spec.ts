import { TestBed } from '@angular/core/testing';

import { SubpageService } from './subpage.service';

describe('SubpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubpageService = TestBed.get(SubpageService);
    expect(service).toBeTruthy();
  });
});
