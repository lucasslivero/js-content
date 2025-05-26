import type { StateCreator } from 'zustand';

import type { CounterSlice } from './slices/counterSlice';
import type { UserSlice } from './slices/userSlice';

export type Store = {
  user: UserSlice;
  counter: CounterSlice;
};

export type StoreSlice<TSlice> = StateCreator<
  Store,
  [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  TSlice
>;
