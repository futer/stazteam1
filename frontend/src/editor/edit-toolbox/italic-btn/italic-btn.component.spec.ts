import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalicBtnComponent } from './italic-btn.component';

describe('ItalicBtnComponent', () => {
  let component: ItalicBtnComponent;
  let fixture: ComponentFixture<ItalicBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItalicBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItalicBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
