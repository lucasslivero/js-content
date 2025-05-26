import { produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createCounterSlice } from './slices/counterSlice';
import { createUserSlice } from './slices/userSlice';
import { type Store } from './Store';

export const useStore = create<Store>()(
  devtools(
    persist(
      immer((...params) => ({
        counter: { ...createCounterSlice(...params) },
        user: { ...createUserSlice(...params) },
      })),
      {
        name: 'storage-key',
        merge: (persistedState, currentState) =>
          produce(currentState, (draft) => {
            Object.entries(draft).forEach(([key, initialSliceValue]) => {
              const typesafeKey = key as keyof typeof persistedState;
              const persistedSliceValue = (persistedState as Store)[typesafeKey];

              Object.assign(initialSliceValue, persistedSliceValue);
            });
          }),
      },
    ),
    { enabled: import.meta.env.DEV },
  ),
);
