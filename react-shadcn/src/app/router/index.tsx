import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Pagination } from '@/components/ui/Pagination';
import { AuthLayout } from '@/ui/layouts/AuthLayout';
import { FileUploader } from '@/ui/pages/file-uploader';
import { Home } from '@/ui/pages/home';
import { OptimisticUpdate } from '@/ui/pages/optimistic-updates';
import { PaginationInfinityScroll } from '@/ui/pages/pagination-infinity-scroll';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/file-uploader" element={<FileUploader />} />
          <Route path="/optimistic-updates" element={<OptimisticUpdate />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/pagination-infinity-scroll" element={<PaginationInfinityScroll />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
