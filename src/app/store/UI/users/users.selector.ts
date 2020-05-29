import { AppState } from '../../app.state';

export const appUsers = (state: AppState) => {
  return state.uiUsers.user;
};
