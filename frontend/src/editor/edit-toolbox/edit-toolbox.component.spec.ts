import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToolboxComponent } from './edit-toolbox.component';

describe('EditToolboxComponent', () => {
  let component: EditToolboxComponent;
  let fixture: ComponentFixture<EditToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
