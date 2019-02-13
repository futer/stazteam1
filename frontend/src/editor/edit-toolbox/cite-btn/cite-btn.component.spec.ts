import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteBtnComponent } from './cite-btn.component';

describe('CiteBtnComponent', () => {
  let component: CiteBtnComponent;
  let fixture: ComponentFixture<CiteBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiteBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
