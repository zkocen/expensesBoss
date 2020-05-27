import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import {
  allExpenses,
  expensesTotalOverall,
} from '../store/UI/expenses/expenses.selector';
@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss'],
})
export class AllExpensesComponent implements OnInit {
  public expensesList$ = this.store.select(allExpenses);
  public expensesTotalOverall$ = this.store.select(expensesTotalOverall);
  public show = false;

  constructor(private store: Store<AppState>) {}

  public toggle() {
    this.show = !this.show;
  }
  ngOnInit() {}
}
