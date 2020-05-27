import { Component, OnInit } from '@angular/core';
import { idLastExpense } from '../store/UI/expenses/expenses.selector';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit {
  // public newId$ = this.store.select(idLastExpense);
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
