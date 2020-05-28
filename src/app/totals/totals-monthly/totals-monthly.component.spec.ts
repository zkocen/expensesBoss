import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsMonthlyComponent } from './totals-monthly.component';

describe('TotalsMonthlyComponent', () => {
  let component: TotalsMonthlyComponent;
  let fixture: ComponentFixture<TotalsMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
