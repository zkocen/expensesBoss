import { AppState } from '../../app.state';
import { ExpensesState, Expense } from './expenses.state';
import { createSelector } from '@ngrx/store';
import { groupBy } from 'lodash';

export const exState = (state: AppState) => state.uiExpenses;

export const allExpenses = createSelector(exState, (state: ExpensesState) => {
  return state.expenses.filter((expense) => expense.archived === false);
});

export const allExpensesUnpaid = createSelector(
  exState,
  (state: ExpensesState) => {
    return state.expenses.filter(
      (expense) => expense.archived === false && expense.paid === false
    );
  }
);

export const expensesTotalOverall = createSelector(
  allExpensesUnpaid,
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
  exState,
  expensesPerMonth,
  (expensesState: ExpensesState, exPm: [string, Expense[]][]) => {
    let res = [];
    exPm.map((m) => {
      if (m[0] === expensesState.currentMonth[0].cm) {
        res = m[1];
      }
    });

    return {
      currentMonth: {
        cm: [expensesState.currentMonth[0].cm],
      },
      expenses: res,
    };
  }
);

export const paidByUser = createSelector(
  allExpensesUnpaid,
  (state: Expense[]) => {
    let result = [];
    if (state.length > 0) {
      result = [
        ...state
          .reduce((r, o) => {
            const key = o.paidBy;

            const item =
              r.get(key) ||
              Object.assign({}, o, {
                name: [],
                category: [],
                amount: 0,
              });

            item.name.push(o.name);
            item.category.push(o.category);
            item.amount += o.amount;
            return r.set(key, item);
          }, new Map())
          .values(),
      ];
    }
    return result;
  }
);

export const paidByUserPerMonth = createSelector(
  allExpensesUnpaid,
  exState,
  (state: Expense[], st: ExpensesState) => {
    let result = [];

    if (state.length > 0) {
      result = [
        ...state
          .reduce((r, o) => {
            let key: string;
            let item: {
              name: string[];
              category: string[];
              amount: number;
            };
            if (o.month === st.currentMonth[0].cm) {
              key = o.paidBy;
              item =
                r.get(key) ||
                Object.assign({}, o, {
                  name: [],
                  category: [],
                  amount: 0,
                });

              item.name.push(o.name);
              item.category.push(o.category);
              item.amount += o.amount;
            }
            return r.set(key, item);
          }, new Map())
          .values(),
      ].filter((item) => item);
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
        ...x,
        oves: false,
        ovedAmount: x.amount - sharePerUser,
      });
    } else if (x.amount < sharePerUser) {
      res.push({
        ...x,
        oves: true,
        ovedAmount: sharePerUser - x.amount,
      });
    } else {
      res.push({ ...x, oves: false, ovedAmount: 0 });
    }
  });
  return res;
});

export const debtCalcPerMonth = createSelector(
  paidByUserPerMonth,
  (state: Expense[]) => {
    const total = state.reduce((a, b) => a + b.amount, 0);
    const sharePerUser = total / state.length;
    const res = [];

    state.map((x) => {
      if (x.amount > sharePerUser) {
        res.push({
          ...x,
          oves: false,
          ovedAmount: x.amount - sharePerUser,
        });
      } else if (x.amount < sharePerUser) {
        res.push({
          ...x,
          oves: true,
          ovedAmount: sharePerUser - x.amount,
        });
      } else {
        res.push({ ...x, oves: false, ovedAmount: 0 });
      }
    });
    return res;
  }
);

export const userPaidDebt = createSelector(
  paidByUser,
  debtCalc,
  (pUsr: Expense[], dCals: Expense[]) => {
    const mergeByPayer = (a: any[], b: any[]) =>
      a.map((itm: { _id: string }) => ({
        ...b.find((item: { _id: string }) => item._id === itm._id && item),
        ...itm,
      }));

    return mergeByPayer(pUsr, dCals);
  }
);
