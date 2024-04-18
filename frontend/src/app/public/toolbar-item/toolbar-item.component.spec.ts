import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarItemComponent } from './toolbar-item.component';

describe('ToolbarItemComponent', () => {
  let component: ToolbarItemComponent;
  let fixture: ComponentFixture<ToolbarItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarItemComponent]
    });
    fixture = TestBed.createComponent(ToolbarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
