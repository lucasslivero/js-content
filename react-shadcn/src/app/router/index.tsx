import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@/ui/layouts/AuthLayout';
import { HomePage } from '@/ui/pages/home';

import { ROUTE_LINKS } from './routes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          {ROUTE_LINKS.map(({ url, Element }) => (
            <Route key={url} path={url} element={<Element />} />
          ))}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
