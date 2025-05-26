import { useShallow } from 'zustand/react/shallow';

import { useStore } from '@/app/store';
import { Button } from '@/components/ui/Button';

export function Counter() {
  // eslint-disable-next-line no-console
  console.log('Counter rendered!');

  const { counter, increment } = useStore(
    useShallow((state) => ({
      counter: state.counter.value,
      increment: state.counter.increment,
    })),
  );

  return (
    <div className="space-y-2">
      <h1>Counter: {counter}</h1>
      <Button type="button" onClick={increment}>
        Incrementar
      </Button>
    </div>
  );
}
