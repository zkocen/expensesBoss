import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { editExpenseBegin } from '../../store/UI/expenses/expense.actions';
import { Expense } from '../../store/UI/expenses/expenses.state';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseComponent } from 'src/app/expense/expense.component';
import { MY_FORMATS } from 'src/app/shared/formats';
import * as moment from 'moment';
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

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

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
    if (expense) {
      this.store.dispatch(editExpenseBegin({ expense: newExpense }));
    }
  }

  public openDialog(expense: Expense) {
    const dialogRef = this.dialog.open(ExpenseComponent, {
      width: '250px',
      data: { expense },
    });

    dialogRef.afterClosed().subscribe((result: Expense) => {
      const resultCopy: Expense = result;
      resultCopy.month = moment(
        result.month,
        MY_FORMATS.display.monthYearLabel
      ).format(MY_FORMATS.parse.dateInput);

      if (resultCopy._id) {
        this.store.dispatch(editExpenseBegin({ expense: resultCopy }));
      }
    });
  }

  public trackByIndex(indx: number, expense: Expense) {
    return expense._id;
  }

  ngOnInit() {}
}
