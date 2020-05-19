import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { archiveExpenseBegin } from '../../store/UI/expenses/expense.actions';
import { Expense } from '../../store/UI/expenses/expenses.state';

@Component({
  selector: 'app-all-expenses-single',
  templateUrl: './all-expenses-single.component.html',
  styleUrls: ['./all-expenses-single.component.scss'],
})
export class AllExpensesSingleComponent implements OnInit {
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
