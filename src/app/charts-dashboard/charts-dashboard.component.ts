import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { selectedMonth } from '../store/UI/expenses/expenses.selector';
import { map, filter } from 'rxjs/operators';
import { Expense } from '../store/UI/expenses/expenses.state';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.scss'],
})
export class ChartsDashboardComponent implements OnInit {
  public selectedMonth$ = this.store.select(selectedMonth).pipe(
    map((x) =>
      x.expenses.map((ex) => {
        return { name: ex.name, value: ex.amount };
      })
    )
  );

  public selectedMonthNotPaid$ = this.store.select(selectedMonth).pipe(
    map((x) =>
      x.expenses
        .filter((y: Expense) => !y.paid)
        .map((ex) => {
          return { name: ex.name, value: ex.amount };
        })
    )
  );

  constructor(private store: Store<AppState>) {}

  public ngOnInit() {}
}
