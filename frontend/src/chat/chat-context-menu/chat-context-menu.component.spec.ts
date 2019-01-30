import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContextMenuComponent } from './chat-context-menu.component';

describe('ChatContextMenuComponent', () => {
  let component: ChatContextMenuComponent;
  let fixture: ComponentFixture<ChatContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
