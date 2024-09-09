import { ReactNode, Suspense } from 'react';

import { Spinner } from '@/components/ui/Spinner';

export function SuspenseLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner size="large" />}>{children}</Suspense>;
}
