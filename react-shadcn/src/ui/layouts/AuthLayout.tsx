import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';

export function AuthLayout() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />

      <main className="h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-auto p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
