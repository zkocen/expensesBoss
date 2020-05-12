import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  selectedMonth,
  userPaidDebt,
} from '../store/UI/expenses/expenses.selector';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.scss'],
})
export class MonthlyExpensesComponent implements OnInit, OnChanges {
  constructor(private store: Store<AppState>) {}

  public selectedMonth$ = this.store.select(selectedMonth);
  public userPaidDebt$ = this.store.select(userPaidDebt);
  ngOnChanges() {}

  ngOnInit() {}
}
