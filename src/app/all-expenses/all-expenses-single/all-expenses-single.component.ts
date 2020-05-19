import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { archiveExpenseBegin } from '../../store/UI/expenses/expense.actions';
import { Expense } from '../../store/UI/expenses/expenses.state';
import { MatDialog } from '@angular/material';
import { ExpenseComponent } from 'src/app/expense/expense.component';

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
    if (expense.id) {
      this.store.dispatch(archiveExpenseBegin({ expense: newExpense }));
    }
  }

  public openDialog(expense: Expense) {
    console.log('ex', expense);
    const dialogRef = this.dialog.open(ExpenseComponent, {
      width: '250px',
      data: { expense },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('result', result);
    });
  }

  public trackByIndex(indx: number, expense: Expense) {
    return expense.id;
  }

  ngOnInit() {}
}
