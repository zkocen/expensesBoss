import { UsersState } from './users.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.actions';

export const usersInitialState: UsersState = {
  user: [
    {
      _id: '',
      name: 'Zan',
      username: '',
      password: '',
      ovedAmount: 0,
      oves: false,
    },
    {
      _id: '',
      name: 'Sanja',
      username: '',
      password: '',
      ovedAmount: 0,
      oves: false,
    },
  ],
};

export const usersReducer = createReducer(
  usersInitialState,
  on(UsersActions.loadCurrentUsers, (state): UsersState => ({ ...state })),
  on(UsersActions.loadCurrentUsersSuccess, (state, data): UsersState | any => ({
    ...state,
    user: data.users,
  }))
);

export function usrReducer(
  usr: UsersState | undefined,
  action: Action
): UsersState {
  return usersReducer(usr, action);
}
