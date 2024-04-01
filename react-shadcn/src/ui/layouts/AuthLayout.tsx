import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

export function AuthLayout() {
  return (
    <div className="h-full w-full">
      <Header />

      <main className="mt-5 space-y-3">
        <Outlet />
      </main>
    </div>
  );
}
