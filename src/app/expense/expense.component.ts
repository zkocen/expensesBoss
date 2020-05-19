import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Expense } from '../store/UI/expenses/expenses.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MY_FORMATS } from '../shared/formats';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  public editExpenseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExpenseComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { expense: Expense }
  ) {}

  public createForm() {
    const monthMom = moment(
      this.data.expense.month,
      MY_FORMATS.parse.dateInput
    ).format(MY_FORMATS.display.monthYearLabel);
    this.editExpenseForm = this.fb.group({
      id: this.data.expense.id,
      name: [
        this.data.expense.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      amount: [
        this.data.expense.amount,
        [Validators.required, Validators.min(1)],
      ],
      paidBy: [this.data.expense.paidBy, [Validators.required]],
      month: [monthMom, [Validators.required]],
      dateEntered: this.data.expense.dateEntered,
      recurring: this.data.expense.recurring,
      category: [this.data.expense.category, [Validators.required]],
      archived: this.data.expense.archived,
    });
  }

  ngOnInit() {
    this.createForm();
  }
}
