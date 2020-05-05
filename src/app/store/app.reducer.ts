import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { dpReducer } from './UI/date-picker/date-picker.reducer';

export const reducers: ActionReducerMap<AppState> = {
  uiDatePicker: dpReducer,
};
