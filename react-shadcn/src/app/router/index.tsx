import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@/ui/layouts/AuthLayout';
import { ErrorBoundaryPage } from '@/ui/pages/error-boundary';
import { HomePage } from '@/ui/pages/home';

const FileUploaderPage = lazy(() => import('@/ui/pages/file-uploader'));
const OptimisticUpdatePage = lazy(() => import('@/ui/pages/optimistic-updates'));
const PaginationPage = lazy(() => import('@/ui/pages/pagination'));
const PaginationInfinityScrollPage = lazy(() => import('@/ui/pages/pagination-infinity-scroll'));
const SuspensePage = lazy(() => import('@/ui/pages/suspense'));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/file-uploader" element={<FileUploaderPage />} />
          <Route path="/optimistic-updates" element={<OptimisticUpdatePage />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/pagination-infinity-scroll" element={<PaginationInfinityScrollPage />} />
          <Route path="/suspense" element={<SuspensePage />} />
          <Route path="/error-boundary" element={<ErrorBoundaryPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
