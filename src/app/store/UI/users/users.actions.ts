import { createAction, props } from '@ngrx/store';
import { User } from './users.state';

export const loadCurrentUsers = createAction('[Users Action] load users');

export const loadCurrentUsersSuccess = createAction(
  '[Users Action] load users success',
  props<{ users: User }>()
);
