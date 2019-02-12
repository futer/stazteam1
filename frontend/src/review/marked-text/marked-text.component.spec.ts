import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedTextComponent } from './marked-text.component';

describe('MarkedTextComponent', () => {
  let component: MarkedTextComponent;
  let fixture: ComponentFixture<MarkedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
