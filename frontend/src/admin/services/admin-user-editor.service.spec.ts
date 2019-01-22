import { TestBed } from '@angular/core/testing';

import { AdminUserEditorService } from './admin-user-editor.service';

describe('AdminUserEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserEditorService = TestBed.get(AdminUserEditorService);
    expect(service).toBeTruthy();
  });
});
