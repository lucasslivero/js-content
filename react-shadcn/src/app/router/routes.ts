import { History, Settings2, Star, Store } from 'lucide-react';
import { lazy } from 'react';

import { ErrorBoundaryPage } from '@/ui/pages/error-boundary';
import { HookformPage } from '@/ui/pages/hook-form';
import { HookformDynamicPage } from '@/ui/pages/hook-form-dynamic';
import { HookformMultiStepPage } from '@/ui/pages/hook-form-multi-step';
import ZustandPage from '@/ui/pages/zustand';

const FileUploaderPage = lazy(() => import('@/ui/pages/file-uploader'));
const OptimisticUpdatePage = lazy(() => import('@/ui/pages/optimistic-updates'));
const PaginationPage = lazy(() => import('@/ui/pages/pagination'));
const PaginationInfinityScrollPage = lazy(() => import('@/ui/pages/pagination-infinity-scroll'));
const SuspensePage = lazy(() => import('@/ui/pages/suspense'));

export const ROUTE_LINKS = [
  {
    title: 'File Uploader',
    url: '/file-uploader',
    icon: History,
    description: 'File Uploader Page',
    Element: FileUploaderPage,
  },
  {
    title: 'Optimistic Updates',
    url: '/optimistic-updates',
    icon: Star,
    description: 'Optimistic Updates Page',
    Element: OptimisticUpdatePage,
  },
  {
    title: 'Pagination',
    url: '/pagination',
    icon: Settings2,
    description: 'Pagination Page',
    Element: PaginationPage,
  },
  {
    title: 'Pagination (Infinity Scroll)',
    url: '/pagination-infinity-scroll',
    icon: Settings2,
    description: 'Pagination with Infinity Scroll Page',
    Element: PaginationInfinityScrollPage,
  },
  {
    title: 'Suspense',
    url: '/suspense',
    icon: Settings2,
    description: 'React Suspense nested components example Page',
    Element: SuspensePage,
  },
  {
    title: 'Error Boundary',
    url: '/error-boundary',
    icon: Settings2,
    description: 'Error Boundary Page to test it flows',
    Element: ErrorBoundaryPage,
  },
  {
    title: 'Hook Form',
    url: '/hook-form',
    icon: Settings2,
    description: 'Hook form Page with most of use cases',
    Element: HookformPage,
  },
  {
    title: 'Hook Form dynamic',
    url: '/hook-form-dynamic',
    icon: Settings2,
    description: 'Hook form dynamic Page for dynamic arrays',
    Element: HookformDynamicPage,
  },
  {
    title: 'Hook Form Multi Step',
    url: '/hook-form-multi-step',
    icon: Settings2,
    description: 'Hook form multi step Page for multi step forms',
    Element: HookformMultiStepPage,
  },
  {
    title: 'Zustand',
    url: '/zustand',
    icon: Store,
    description: 'Zustand with middlewares',
    Element: ZustandPage,
  },
];
