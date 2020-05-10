import { createAction, props } from '@ngrx/store';
import { Expense } from './expenses.state';

export const setExpensesState = createAction(
  '[Expenses Action] Add Expense',
  props<{
    id: number;
    month: string;
    dateEntered: string;
    recurring: boolean;
    category: string;
    name: string;
    amount: number;
    paidBy: string;
  }>()
);

export const loadExpenses = createAction('[Expenses Action] Load Expenses');

export const loadExpensesSuccess = createAction(
  '[Expenses Action] Load Success',
  props<{ expenses: Expense }>()
);
