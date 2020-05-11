import { AppState } from '../../app.state';
import { ExpensesState, Expense } from './expenses.state';
import { createSelector } from '@ngrx/store';
import { groupBy } from 'lodash';
import { filter } from 'rxjs/operators';

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

    exPm.map((m) => {
      if (m[0] === exState.currentMonth[0]) {
        res = m[1];
      }
    });

    return { currentMonth: [exState.currentMonth[0]], expenses: res };
  }
);

export const paidByUser = createSelector(selectedMonth, (state: any) => {
  let result = [];

  if (state.expenses.length > 0) {
    result = [
      ...state.expenses
        .reduce((r, o) => {
          const key = o.paidBy;

          const item =
            r.get(key) ||
            Object.assign({}, o, {
              name: '',
              amount: 0,
            });

          item.name += ' ' + o.name;
          item.amount += o.amount;
          return r.set(key, item);
        }, new Map())
        .values(),
    ];
  }

  return result;
});
