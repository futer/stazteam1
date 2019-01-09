import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPrevComponent } from './doc-prev.component';

describe('DocPrevComponent', () => {
  let component: DocPrevComponent;
  let fixture: ComponentFixture<DocPrevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocPrevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
