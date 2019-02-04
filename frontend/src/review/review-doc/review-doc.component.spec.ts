import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDocComponent } from './review-doc.component';

describe('ReviewDocComponent', () => {
  let component: ReviewDocComponent;
  let fixture: ComponentFixture<ReviewDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
