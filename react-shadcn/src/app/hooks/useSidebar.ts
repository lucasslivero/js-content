import { useState } from 'react';

export function useSidebar() {
  const [state, setState] = useState<'closed' | 'open'>('open');

  return {
    open: state === 'open',
    onOpenChange: (open: boolean) => setState(open ? 'open' : 'closed'),
  };
}
