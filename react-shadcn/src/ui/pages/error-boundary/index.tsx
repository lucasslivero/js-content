import { ErrorTest } from '@/components/error-boundary/ErrorTest';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function ErrorBoundaryPage() {
  return (
    <div className="flex">
      <ErrorBoundary fallback={<h1>Cara que onda meu</h1>}>
        <ErrorTest />
      </ErrorBoundary>
    </div>
  );
}
