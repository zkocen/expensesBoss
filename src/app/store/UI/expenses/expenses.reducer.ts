import { ExpensesState, Expense } from './expenses.state';
import * as moment from 'moment';
import { createReducer, on, Action } from '@ngrx/store';
import * as ExpensesActions from './expense.actions';
import { MY_FORMATS } from 'src/app/shared/formats';

export const expensesInitialState: ExpensesState = {
  currentMonth: [moment().format(MY_FORMATS.parse.dateInput)],
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
  on(ExpensesActions.loadExpenses, (state) => ({ ...state })),
  on(ExpensesActions.loadExpensesSuccess, (state, data): any => {
    return { currentMonth: [state.currentMonth], expenses: data.expenses };
  }),
  on(ExpensesActions.setCurrentMonth, (state, { currentMonth }) => ({
    ...state,
    currentMonth,
  }))
);

export function exReducer(
  rs: ExpensesState | undefined,
  action: Action
): ExpensesState {
  return expensesReducer(rs, action);
}
