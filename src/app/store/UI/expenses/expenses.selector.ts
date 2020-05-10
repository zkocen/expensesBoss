import { AppState } from '../../app.state';
import { ExpensesState, Expense } from './expenses.state';
import { createSelector } from '@ngrx/store';

export const ExState = (state: AppState) => state.uiExpenses;

export const selectedMonth = createSelector(ExState, (state: ExpensesState) =>
  state.expenses.map((x) => x.month)
);

export const allExpenses = createSelector(ExState, (state: ExpensesState) => {
  return state.expenses;
});

export const expensesTotalOverall = createSelector(
  allExpenses,
  (state: Expense[]) => {
    return state.reduce((a, b) => a + b.amount, 0);
  }
);
