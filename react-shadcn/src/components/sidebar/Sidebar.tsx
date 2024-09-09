import {
  Atom,
  Eclipse,
  Frame,
  History,
  LifeBuoy,
  Link,
  Rabbit,
  Send,
  Settings2,
  Star,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from '@/components/ui/Sidebar';

import { NavMain } from './NavMain';
import { NavProjects } from './NavProjects';
import { NavSecondary } from './NavSecondary';
import { NavUser } from './NavUser';
import { StorageCard } from './StorageCard';
import { TeamSwitcher } from './TeamSwitcher';

const data = {
  teams: [
    {
      name: 'Acme Inc',
      logo: Atom,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: Eclipse,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Rabbit,
      plan: 'Free',
    },
  ],
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Pages',
      url: '#',
      icon: Link,
      isActive: true,
      items: [
        {
          title: 'File Uploader',
          url: '/file-uploader',
          icon: History,
          description: 'File Uploader Page',
        },
        {
          title: 'Optimistic Updates',
          url: '/optimistic-updates',
          icon: Star,
          description: 'Optimistic Updates Page',
        },
        {
          title: 'Pagination',
          url: '/pagination',
          icon: Settings2,
          description: 'Pagination Page',
        },
        {
          title: 'Pagination (Infinity Scroll)',
          url: '/pagination-infinity-scroll',
          icon: Settings2,
          description: 'Pagination with Infinity Scroll Page',
        },
        {
          title: 'Suspense',
          url: '/suspense',
          icon: Settings2,
          description: 'React Suspense nested components example Page',
        },
        {
          title: 'Error Boundary',
          url: '/error-boundary',
          icon: Settings2,
          description: 'Error Boundary Page to test it flows',
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
  ],
  searchResults: [
    {
      title: 'Routing Fundamentals',
      teaser:
        'The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.',
      url: '#',
    },
    {
      title: 'Layouts and Templates',
      teaser:
        'The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.',
      url: '#',
    },
    {
      title: 'Data Fetching, Caching, and Revalidating',
      teaser:
        'Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.',
      url: '#',
    },
    {
      title: 'Server and Client Composition Patterns',
      teaser:
        'When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ',
      url: '#',
    },
    {
      title: 'Server Actions and Mutations',
      teaser:
        'Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.',
      url: '#',
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-[60px] border-b-2">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Links</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem>
          <SidebarLabel>Projects</SidebarLabel>
          <NavProjects projects={data.projects} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
        <SidebarItem>
          <StorageCard />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
