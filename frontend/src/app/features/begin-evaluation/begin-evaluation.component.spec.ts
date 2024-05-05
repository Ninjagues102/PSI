import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginEvaluationComponent } from './begin-evaluation.component';

describe('BeginEvaluationComponent', () => {
  let component: BeginEvaluationComponent;
  let fixture: ComponentFixture<BeginEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeginEvaluationComponent]
    });
    fixture = TestBed.createComponent(BeginEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
