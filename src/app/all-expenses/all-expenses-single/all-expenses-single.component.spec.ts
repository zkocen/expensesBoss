import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpensesSingleComponent } from './all-expenses-single.component';

describe('AllExpensesSingleComponent', () => {
  let component: AllExpensesSingleComponent;
  let fixture: ComponentFixture<AllExpensesSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExpensesSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpensesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
