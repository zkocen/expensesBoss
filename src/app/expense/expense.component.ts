import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Expense } from '../store/UI/expenses/expenses.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MY_FORMATS, ExpenseType } from '../shared/formats';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  public editExpenseForm: FormGroup;
  public categories = ExpenseType;

  constructor(
    public dialogRef: MatDialogRef<ExpenseComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { expense: Expense }
  ) {}

  public formErrors = {
    amount: '',
    month: '',
    name: '',
    paidBy: '',
  };

  public validationMessages = {
    amount: {
      required: 'Amount is required',
      min: 'Amount must be more than 1 pound',
    },
    name: {
      required: 'Name of purchase is required',
      minlength: 'Name of purchase must be at least 2 characters long',
      maxlength: 'Name of purchase must not be longer than 25 characters',
    },
    paidBy: {
      required: 'Who paid must be selected',
    },
    month: {
      required: 'Month must be selected',
    },
    category: {
      required: 'Category must be selected',
    },
  };

  public onValueChanged(data?: any) {
    if (!this.editExpenseForm) {
      return;
    }

    const form = this.editExpenseForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error msg (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  public createForm() {
    const monthMom = moment(
      this.data.expense.month,
      MY_FORMATS.parse.dateInput
    ).format(MY_FORMATS.display.monthYearLabel);
    this.editExpenseForm = this.fb.group({
      _id: this.data.expense._id,
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
      paid: this.data.expense.paid,
    });

    this.editExpenseForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });

    this.onValueChanged();
  }

  ngOnInit() {
    this.createForm();
  }
}
