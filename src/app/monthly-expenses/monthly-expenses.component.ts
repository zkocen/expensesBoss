import { Component, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectedMonth } from '../store/UI/expenses/expenses.selector';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Expense } from '../store/UI/expenses/expenses.state';
import { editExpenseBegin } from '../store/UI/expenses/expense.actions';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { MY_FORMATS } from '../shared/formats';
import { ExpenseComponent } from '../expense/expense.component';
import {
  moveItemInArray,
  transferArrayItem,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.scss'],
})
export class MonthlyExpensesComponent implements OnInit, OnChanges {
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  public selectedMonth$ = this.store.select(selectedMonth);

  public faTimes = faTimes;
  public showDetails = false;
  public showDetailsId: number;
  public paidExpenses: Expense[] = [];
  ngOnChanges() {}

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

  public over(index) {
    this.showDetails = true;
    this.showDetailsId = index;
  }

  public trackByIndex(indx: number, _: any) {
    return indx;
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

  ngOnInit() {}

  public drop(expense: CdkDragDrop<Expense[]>) {
    if (expense.previousContainer === expense.container) {
      moveItemInArray(
        expense.container.data,
        expense.previousIndex,
        expense.currentIndex
      );
    } else {
      if (expense.previousContainer.id === 'cdk-drop-list-0') {
        transferArrayItem(
          expense.previousContainer.data.map((e) => {
            return {
              ...e,
              paid: true,
            };
          }),
          expense.container.data,
          expense.previousIndex,
          expense.currentIndex
        );
        expense.previousContainer.data.splice(expense.previousIndex, 1);
      }
      if (expense.previousContainer.id === 'cdk-drop-list-1') {
        transferArrayItem(
          expense.previousContainer.data.map((e) => {
            return {
              ...e,
              paid: false,
            };
          }),
          expense.container.data,
          expense.previousIndex,
          expense.currentIndex
        );
        expense.previousContainer.data.splice(expense.previousIndex, 1);
      }
    }
  }
}
