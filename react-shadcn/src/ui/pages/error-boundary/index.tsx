import { ErrorBoundary } from '@/components/ErrorBoundary';

import { ErrorTest } from './ErrorTest';

export function ErrorBoundaryPage() {
  return (
    <div className="flex">
      <ErrorBoundary fallback={<h1>Cara que onda meu</h1>}>
        <ErrorTest />
      </ErrorBoundary>
    </div>
  );
}
