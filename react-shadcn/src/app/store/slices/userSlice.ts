/* eslint-disable no-param-reassign */
import { type StoreSlice } from '../Store';

type UserStore = {
  data: {
    name: string;
    email: string;
    username: string;
  };
};

type UserActions = {
  setUsername: (username: string) => void;
};

export type UserSlice = UserStore & UserActions;

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: {
    name: 'Mateus Silva',
    email: 'mateus@jstack.com.br',
    username: 'maateusilva',
  },
  setUsername: (username: string) =>
    set((prevState) => {
      prevState.user.data.username = username;
    }),
});
