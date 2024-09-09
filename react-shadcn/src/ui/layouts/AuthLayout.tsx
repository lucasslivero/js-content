import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { AppSidebar } from '@/components/sidebar/Sidebar';
import { SidebarLayout } from '@/components/ui/Sidebar';

import { ErrorLayout } from './ErrorLayout';
import { SuspenseLayout } from './SuspenseLayout';

export function AuthLayout() {
  return (
    <SidebarLayout defaultOpen>
      <AppSidebar />
      <div className="flex h-full w-full flex-col">
        <Header />

        <main className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto p-5">
            <ErrorBoundary fallback={<ErrorLayout />}>
              <SuspenseLayout>
                <Outlet />
              </SuspenseLayout>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </SidebarLayout>
  );
}
