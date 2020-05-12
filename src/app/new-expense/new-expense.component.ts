import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss'],
})
export class NewExpenseComponent implements OnInit {
  public newExpenseForm: FormGroup;
  @ViewChild('neform', { static: true }) public feedbackFormDirective;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.newExpenseForm = this.fb.group({
      name: [''],
      amount: 0,
      paidBy: [''],
      month: [''],
    });
  }

  public onSubmit() {
    console.log('form', this.newExpenseForm);
  }
}
