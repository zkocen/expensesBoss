import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Expense } from '../store/UI/expenses/expenses.state';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { idLastExpense } from '../store/UI/expenses/expenses.selector';
import { newExpense } from '../store/UI/expenses/expense.actions';
import { ExpenseType, MY_FORMATS } from '../shared/formats';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss'],
  providers: [DatePipe],
})
export class NewExpenseComponent implements OnInit {
  public newExpenseForm: FormGroup;
  public newExpense: Expense;
  public lastId: number;
  public category = ExpenseType;

  @ViewChild('neform', { static: true }) public newExpenseFormDirective;

  constructor(
    private datePipe: DatePipe,
    public fb: FormBuilder,
    public store: Store<AppState>
  ) {}

  ngOnInit() {
    this.createForm();
    this.store.select(idLastExpense).subscribe((x) => (this.lastId = x));
  }

  public createForm() {
    this.newExpenseForm = this.fb.group({
      id: 0,
      name: '',
      amount: 0,
      paidBy: '',
      month: '',
      dateEntered: '',
      recurring: false,
      category: 'groseries',
    });
  }

  public onSubmit() {
    this.newExpenseForm.value.dateEntered = new Date().toISOString();
    this.newExpenseForm.value.month = this.datePipe.transform(
      this.newExpenseForm.value.month,
      MY_FORMATS.parse.dateInputPiped
    );
    this.newExpenseForm.value.id = ++this.lastId;
    this.newExpense = this.newExpenseForm.value;

    this.store.dispatch(newExpense({ expenses: this.newExpense }));

    this.newExpenseForm.reset({
      id: 0,
      name: '',
      amount: 0,
      paidBy: '',
      month: '',
      dateEntered: '',
      recurring: false,
      category: 'groseries',
    });
  }
}
