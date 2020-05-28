import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { exReducer } from './UI/expenses/expenses.reducer';
import { usrReducer } from './UI/users/users.reducer';

export const reducers: ActionReducerMap<AppState> = {
  uiExpenses: exReducer,
  uiUsers: usrReducer,
};
