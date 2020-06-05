import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/store/UI/expenses/expenses.state';
import { MatDialog } from '@angular/material';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { ExpenseComponent } from 'src/app/expense/expense.component';
import * as moment from 'moment';
import { MY_FORMATS } from 'src/app/shared/formats';
import { editExpenseBegin } from 'src/app/store/UI/expenses/expense.actions';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.scss'],
})
export class PaidComponent implements OnInit, OnChanges {
  @Input() public expenses: Expense[] = [];
  public faTimes = faTimes;
  public showDetails = false;
  public showDetailsId: number;
  public unpaidExpenses: Expense[] = [];
  public paidExpenses: Expense[] = [];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.unpaidExpenses = this.expenses.filter((e) => e.paid === false);
      this.paidExpenses = this.expenses.filter((e) => e.paid === true);
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
        //add current month
        result.month,
        MY_FORMATS.display.monthYearLabel
      ).format(MY_FORMATS.parse.dateInput);
      console.log('resultCopy', resultCopy);
      if (resultCopy._id) {
        this.store.dispatch(editExpenseBegin({ expense: resultCopy }));
      }
    });
  }

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
            const pe = { ...e, paid: true };
            return pe;
          }),
          expense.container.data,
          expense.previousIndex,
          expense.currentIndex
        );
        expense.previousContainer.data.splice(expense.previousIndex, 1);
        expense.container.data.map((d) => {
          this.store.dispatch(editExpenseBegin({ expense: d }));
        });
      }
      if (expense.previousContainer.id === 'cdk-drop-list-1') {
        transferArrayItem(
          expense.previousContainer.data.map((e) => {
            const pe = { ...e, paid: false };
            return pe;
          }),
          expense.container.data,
          expense.previousIndex,
          expense.currentIndex
        );
        expense.previousContainer.data.splice(expense.previousIndex, 1);
        expense.container.data.map((d) => {
          this.store.dispatch(editExpenseBegin({ expense: d }));
        });
      }
    }
  }

  trackByFn(index, item) {
    return item._id;
  }
}
