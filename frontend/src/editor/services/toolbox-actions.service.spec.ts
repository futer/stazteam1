import { TestBed } from '@angular/core/testing';

import { ToolboxActionsService } from './toolbox-actions.service';

describe('ToolboxActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolboxActionsService = TestBed.get(ToolboxActionsService);
    expect(service).toBeTruthy();
  });
});
