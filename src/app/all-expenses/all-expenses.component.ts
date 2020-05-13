import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import {
  allExpenses,
  expensesTotalOverall,
} from '../store/UI/expenses/expenses.selector';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss'],
})
export class AllExpensesComponent implements OnInit {
  public expensesList$ = this.store.select(allExpenses);
  public expensesTotalOverall$ = this.store.select(expensesTotalOverall);
  public show = false;
  public faTimes = faTimes;
  public showDetails = false;
  public showDetailsId: number;

  constructor(private store: Store<AppState>) {}

  public toggle() {
    this.show = !this.show;
  }

  public over(index) {
    this.showDetails = true;
    this.showDetailsId = index;
  }

  public trackByIndex(indx: number, _: any) {
    return indx;
  }

  ngOnInit() {}
}
