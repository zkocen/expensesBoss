import { AppState } from '../../app.state';
import { ExpensesState, Expense } from './expenses.state';
import { createSelector } from '@ngrx/store';
import { groupBy } from 'lodash';

export const ExState = (state: AppState) => state.uiExpenses;

export const allExpenses = createSelector(ExState, (state: ExpensesState) => {
  return state.expenses;
});

export const expensesTotalOverall = createSelector(
  allExpenses,
  (state: Expense[]) => {
    return state.reduce((a, b) => a + b.amount, 0);
  }
);

export const expensesPerMonth = createSelector(
  allExpenses,
  (state: Expense[]) => {
    return Object.entries(
      groupBy(state, (x: { month: string }) => {
        return x.month;
      })
    );
  }
);

export const selectedMonth = createSelector(
  ExState,
  expensesPerMonth,
  (exState: ExpensesState, exPm: any) => {
    let res = [];

    console.log('exState', exState);
    // console.log('exPm', exPm);

    exPm.map((m) => {
      console.log('m0', m);
      console.log('ddd', exState.currentMonth[0]);
      if (m[0] === exState.currentMonth[0]) {
        console.log('eee');
        res = m[1];
      }
    });

    console.log('res', res);
    return res;
  }
);
