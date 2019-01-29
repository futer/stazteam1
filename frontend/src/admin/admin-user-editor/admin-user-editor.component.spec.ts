import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserEditorComponent } from './admin-user-editor.component';

describe('AdminUserEditorComponent', () => {
  let component: AdminUserEditorComponent;
  let fixture: ComponentFixture<AdminUserEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
