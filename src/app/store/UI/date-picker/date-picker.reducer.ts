import { DatePickerState } from './date-picker.state';
import * as moment from 'moment';
import { createReducer, on, Action } from '@ngrx/store';
import * as DatePickerActions from './date-picker.actions';

export const currentMonth = moment().month();

export const datePickerInitialState: DatePickerState = {
  month: moment().format('MM/YYYY'),
};

export const datePickerReducer = createReducer(
  datePickerInitialState,
  on(DatePickerActions.setDatePickerState, ({ month }) => ({
    month,
  }))
);

export function dpReducer(
  rs: DatePickerState | undefined,
  action: Action
): DatePickerState {
  return datePickerReducer(rs, action);
}
