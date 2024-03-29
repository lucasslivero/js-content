import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from './app/contexts/ThemeContext';
import { queryClient } from './app/libs/queryClient';
import { Header } from './components/Header';
import { Toaster } from './components/ui/Toaster';
import { UserForm } from './components/UserForm';
import { UsersList } from './components/UsersList';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="mx-auto mt-20 max-w-[500px]">
          <Header />

          <main className="mt-10 space-y-3">
            <UserForm />
            <UsersList />
          </main>
        </div>
        <Toaster />
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
