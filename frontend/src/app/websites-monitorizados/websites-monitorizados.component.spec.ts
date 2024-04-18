import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesMonitorizadosComponent } from './websites-monitorizados.component';

describe('WebsitesMonitorizadosComponent', () => {
  let component: WebsitesMonitorizadosComponent;
  let fixture: ComponentFixture<WebsitesMonitorizadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebsitesMonitorizadosComponent]
    });
    fixture = TestBed.createComponent(WebsitesMonitorizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
