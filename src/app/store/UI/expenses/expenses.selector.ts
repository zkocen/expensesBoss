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
  (exState: ExpensesState, exPm: [string, Expense[]][]) => {
    let res = [];
    exPm.map((m) => {
      if (m[0] === exState.currentMonth[0]) {
        res = m[1];
      }
    });

    return { currentMonth: [exState.currentMonth[0]], expenses: res };
  }
);

export const paidByUser = createSelector(
  selectedMonth,
  (state: ExpensesState) => {
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
  }
);

export const debtCalc = createSelector(paidByUser, (state: Expense[]) => {
  const total = state.reduce((a, b) => a + b.amount, 0);
  const sharePerUser = total / state.length;
  const res = [];

  state.map((x) => {
    if (x.amount > sharePerUser) {
      res.push({
        paidBy: x.paidBy,
        oves: false,
        ovedAmount: x.amount - sharePerUser,
      });
    } else if (x.amount < sharePerUser) {
      res.push({
        paidBy: x.paidBy,
        oves: true,
        ovedAmount: sharePerUser - x.amount,
      });
    } else {
      res.push({ paidBy: x.paidBy, oves: false, ovedAmount: 0 });
    }
  });

  return res;
});

export const userPaidDebt = createSelector(
  paidByUser,
  debtCalc,
  (pUsr: Expense[], dCals: Expense[]) => {
    const mergeByPayer = (a, b) =>
      a.map((itm) => ({
        ...b.find((item) => item.paidBy === itm.paidBy && item),
        ...itm,
      }));

    return mergeByPayer(pUsr, dCals);
  }
);

export const idLastExpense = createSelector(allExpenses, (state: Expense[]) => {
  if (state[state.length - 1]) {
    return state[state.length - 1].id;
  }
});
