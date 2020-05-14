import { createAction, props } from '@ngrx/store';
import { Expense } from './expenses.state';

export const setCurrentMonth = createAction(
  '[Expenses Action] Set Current Month',
  props<{ currentMonth: string[] }>()
);

export const loadCurrentMonth = createAction(
  '[Expenses Action] Load Current Month'
);

export const loadCurrentMonthSuccess = createAction(
  '[Expenses Action] Current Month Succenss',
  props<{ currentMonth: string[] }>()
);

export const loadExpenses = createAction('[Expenses Action] Load Expenses');

export const loadExpensesSuccess = createAction(
  '[Expenses Action] Load Expenses Success',
  props<{ expenses: Expense }>()
);

export const newExpense = createAction(
  '[Expenses Action] put new expense',
  props<{ expenses: Expense }>()
);

export const newExpenseAdded = createAction(
  '[Expenses Action] new expense successfully added',
  props<{ expenses: Expense }>()
);

export const archiveExpenseBegin = createAction(
  '[Expenses Action] new expense delete start',
  props<{ expense: Expense }>()
);

export const archiveExpenseSuccess = createAction(
  '[Expenses Action] new expense delete success',
  props<{ expense: Expense }>()
);
