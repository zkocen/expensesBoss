import { AppState } from '../../app.state';

export const appUsers = (state: AppState) => Object.values(state.uiUsers.user);
