import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageContainerComponent } from './subpage-container.component';

describe('SubpageContainerComponent', () => {
  let component: SubpageContainerComponent;
  let fixture: ComponentFixture<SubpageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
