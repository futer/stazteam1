import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderBtnComponent } from './under-btn.component';

describe('UnderBtnComponent', () => {
  let component: UnderBtnComponent;
  let fixture: ComponentFixture<UnderBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
