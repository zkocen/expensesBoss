import { createAction, props } from '@ngrx/store';

export const setDatePickerState = createAction(
  '[DatePicker Item State]',
  props<{ month: string }>()
);
