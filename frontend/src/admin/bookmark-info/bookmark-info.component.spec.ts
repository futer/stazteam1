import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkInfoComponent } from './bookmark-info.component';

describe('BookmarkInfoComponent', () => {
  let component: BookmarkInfoComponent;
  let fixture: ComponentFixture<BookmarkInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
