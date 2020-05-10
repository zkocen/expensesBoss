import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { exReducer } from './UI/expenses/expenses.reducer';

export const reducers: ActionReducerMap<AppState> = {
  uiExpenses: exReducer,
};
