import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterBTNComponent } from './router-btn.component';

describe('RouterBTNComponent', () => {
  let component: RouterBTNComponent;
  let fixture: ComponentFixture<RouterBTNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterBTNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterBTNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
