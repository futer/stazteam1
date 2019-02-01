import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuPrevComponent } from './nav-menu-prev.component';

describe('NavMenuPrevComponent', () => {
  let component: NavMenuPrevComponent;
  let fixture: ComponentFixture<NavMenuPrevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMenuPrevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
