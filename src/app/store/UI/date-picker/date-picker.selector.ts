import { AppState } from '../../app.state';
import { DatePickerState } from './date-picker.state';
import { createSelector } from '@ngrx/store';

export const datePickerState = (state: AppState) => state.uiDatePicker;

export const selectedMonth = createSelector(
  datePickerState,
  (state: DatePickerState) => state.month
);
