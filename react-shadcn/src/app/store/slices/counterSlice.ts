/* eslint-disable no-param-reassign */
import { type StoreSlice } from '../Store';

type CounterStore = {
  value: number;
};

type CounterActions = {
  increment: () => void;
};

export type CounterSlice = CounterStore & CounterActions;

export const createCounterSlice: StoreSlice<CounterSlice> = (set) => ({
  value: 1,
  increment: () =>
    set(
      (prevState) => {
        prevState.counter.value += 1;
      },
      false,
      'action',
    ),
});
