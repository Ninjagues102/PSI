import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWebsiteComponent } from './delete-website.component';

describe('DeleteWebsiteComponent', () => {
  let component: DeleteWebsiteComponent;
  let fixture: ComponentFixture<DeleteWebsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteWebsiteComponent]
    });
    fixture = TestBed.createComponent(DeleteWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
