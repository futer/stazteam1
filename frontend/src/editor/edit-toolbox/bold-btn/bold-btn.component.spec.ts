import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldBtnComponent } from './bold-btn.component';

describe('BoldBtnComponent', () => {
  let component: BoldBtnComponent;
  let fixture: ComponentFixture<BoldBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoldBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoldBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
