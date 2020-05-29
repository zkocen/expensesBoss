export interface UsersState {
  user: User[];
}

export interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
}
