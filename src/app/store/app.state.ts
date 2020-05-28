import { ExpensesState } from './UI/expenses/expenses.state';
import { UsersState } from './UI/users/users.state';

export interface AppState {
  uiExpenses: ExpensesState;
  uiUsers: UsersState;
}
