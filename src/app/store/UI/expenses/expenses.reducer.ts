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
      archived: false,
    },
  ],
};

export const expensesReducer = createReducer(
  expensesInitialState,
  on(
    ExpensesActions.setCurrentMonth,
    (state, { currentMonth }): ExpensesState => ({
      ...state,
      currentMonth,
    })
  ),
  on(ExpensesActions.loadExpenses, (state): ExpensesState => ({ ...state })),
  on(
    ExpensesActions.loadCurrentMonth,
    (state): ExpensesState => ({ ...state })
  ),
  on(ExpensesActions.loadExpensesSuccess, (state, data):
    | ExpensesState
    | any => {
    return {
      ...state,
      expenses: data.expenses,
    };
  }),
  on(
    ExpensesActions.loadCurrentMonthSuccess,
    (state, { currentMonth }): ExpensesState => ({
      ...state,
      currentMonth,
    })
  ),
  on(
    ExpensesActions.newExpense,
    (state, { expenses }): ExpensesState => ({
      ...state,
      expenses: [...state.expenses, expenses],
    })
  ),
  on(
    ExpensesActions.newExpenseAdded,
    (state): ExpensesState => ({
      ...state,
      expenses: [...state.expenses],
    })
  ),
  on(
    ExpensesActions.editExpenseBegin,
    (state, { expense }): ExpensesState => ({
      ...state,
      expenses: state.expenses.map((e: Expense) => {
        if (e.id === expense.id) {
          return expense;
        }
        return e;
      }),
    })
  ),
  on(
    ExpensesActions.editExpenseSuccess,
    (state): ExpensesState => ({
      ...state,
      expenses: [...state.expenses],
    })
  )
);

export function exReducer(
  rs: ExpensesState | undefined,
  action: Action
): ExpensesState {
  return expensesReducer(rs, action);
}
