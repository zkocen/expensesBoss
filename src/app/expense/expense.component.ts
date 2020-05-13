import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Expense } from '../store/UI/expenses/expenses.state';

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

  constructor() {}

  public over(index) {
    this.showDetails = true;
    this.showDetailsId = index;
  }

  public trackByIndex(indx: number, _: any) {
    return indx;
  }

  ngOnInit() {}
}
