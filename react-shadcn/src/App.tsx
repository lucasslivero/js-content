import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from './app/contexts/ThemeContext';
import { queryClient } from './app/libs/queryClient';
import { Router } from './app/router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/Toaster';

export function App() {
  return (
    <ErrorBoundary fallback={<h1>Error has occurred !</h1>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router />
          <Toaster />
        </ThemeProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
