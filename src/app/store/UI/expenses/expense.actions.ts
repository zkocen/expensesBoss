import { createAction, props } from '@ngrx/store';
import { Expense, CurrentMonth } from './expenses.state';

export const setCurrentMonth = createAction(
  '[Expenses Action] Set Current Month',
  props<{ currentMonth: CurrentMonth }>()
);

export const loadCurrentMonth = createAction(
  '[Expenses Action] Load Current Month'
);

export const loadCurrentMonthSuccess = createAction(
  '[Expenses Action] Current Month Succenss'
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
  '[Expenses Action] new expense successfully added'
);

export const editExpenseBegin = createAction(
  '[Expenses Action] new expense edit start',
  props<{ expense: Expense }>()
);

export const editExpenseSuccess = createAction(
  '[Expenses Action] new expense edit success',
  props<{ expense: Expense }>()
);
