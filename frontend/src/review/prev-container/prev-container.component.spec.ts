import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevContainerComponent } from './prev-container.component';

describe('PrevContainerComponent', () => {
  let component: PrevContainerComponent;
  let fixture: ComponentFixture<PrevContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
