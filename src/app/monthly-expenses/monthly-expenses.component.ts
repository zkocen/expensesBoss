import { Component, OnInit, OnChanges } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Store, State } from '@ngrx/store';
import { allExpenses } from '../store/UI/expenses/expenses.selector';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.scss'],
})
export class MonthlyExpensesComponent implements OnInit, OnChanges {
  constructor(private store: Store<AppState>) {}

  ngOnChanges() {}

  ngOnInit() {}
}
