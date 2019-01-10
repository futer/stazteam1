import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessageInfoComponent } from './user-message-info.component';

describe('UserMessageInfoComponent', () => {
  let component: UserMessageInfoComponent;
  let fixture: ComponentFixture<UserMessageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMessageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
