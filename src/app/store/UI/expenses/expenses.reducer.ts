import { ExpensesState, Expense } from './expenses.state';
import * as moment from 'moment';
import { createReducer, on, Action } from '@ngrx/store';
import * as ExpensesActions from './expense.actions';

export const currentMonth = moment().month();

export const expensesInitialState: ExpensesState = {
  expenses: [
    {
      id: 0,
      month: '',
      dateEntered: '',
      recurring: false,
      category: '',
      name: '',
      amount: 0,
      paidBy: '',
    },
  ],
};

export const expensesReducer = createReducer(
  expensesInitialState,
  // on(
  //   ExpensesActions.setExpensesState,
  //   (
  //     itemState,
  //     { id, month, dateEntered, recurring, category, name, amount, paidBy }
  //   ) => ({
  //     ...itemState,
  //     expenses: itemState.expenses.map((expense) => {
  //       if (id === expense.id && month === expense.month) {
  //         return {
  //           id,
  //           month,
  //           dateEntered,
  //           recurring,
  //           category,
  //           name,
  //           amount,
  //           paidBy,
  //         };
  //       }
  //       return expense;
  //     }),
  //   })
  // ),
  on(ExpensesActions.loadExpenses, (state) => ({ ...state })),
  on(ExpensesActions.loadExpensesSuccess, (_, data): any => {
    return { expenses: data.expenses };
  })
);

export function exReducer(
  rs: ExpensesState | undefined,
  action: Action
): ExpensesState {
  return expensesReducer(rs, action);
}
