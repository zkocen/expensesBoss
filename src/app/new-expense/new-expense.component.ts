import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  public createForm() {
    this.newExpenseForm = this.fb.group({
      id: ++this.lastId,
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      amount: [0, [Validators.required, Validators.min(1)]],
      paidBy: ['', [Validators.required]],
      month: ['', [Validators.required]],
      dateEntered: '',
      recurring: false,
      category: ['', [Validators.required]],
    });

    this.newExpenseForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });

    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    if (!this.newExpenseForm) {
      return;
    }

    const form = this.newExpenseForm;
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

  public onSubmit() {
    this.newExpenseForm.value.dateEntered = new Date().toISOString();
    this.newExpenseForm.value.month = this.datePipe.transform(
      this.newExpenseForm.value.month,
      MY_FORMATS.parse.dateInputPiped
    );
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
