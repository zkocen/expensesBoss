import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Expense } from '../store/UI/expenses/expenses.state';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { archiveExpenseBegin } from '../store/UI/expenses/expense.actions';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  @Input() expensesList: Expense[];

  public faTimes = faTimes;
  public showDetails = false;
  public showDetailsId: number;

  constructor(private store: Store<AppState>) {}

  public over(index) {
    this.showDetails = true;
    this.showDetailsId = index;
  }

  public archive(expense: Expense) {
    let newExpense = expense;
    newExpense = {
      ...expense,
      archived: true,
    };
    if (expense.id) {
      this.store.dispatch(archiveExpenseBegin({ expense: newExpense }));
    }
  }

  public trackByIndex(indx: number, expense: Expense) {
    return expense.id;
  }

  ngOnInit() {}
}
