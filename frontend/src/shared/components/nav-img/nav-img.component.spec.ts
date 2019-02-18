import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavImgComponent } from './nav-img.component';

describe('NavImgComponent', () => {
  let component: NavImgComponent;
  let fixture: ComponentFixture<NavImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
