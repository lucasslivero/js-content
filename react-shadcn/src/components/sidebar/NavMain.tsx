import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { ChevronRight, Search, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useIsMobile } from '@/app/hooks/useMobile';
import { cn } from '@/app/libs/utils';

import { Button } from '../ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/Collapsible';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/Drawer';
import { Input } from '../ui/Input';
import { Separator } from '../ui/Separator';

function SidebarSearch({
  results,
}: {
  results: {
    title: string;
    teaser: string;
    url: string;
  }[];
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer className="bg-blue-50">
        <DrawerTrigger className="flex h-8 w-full min-w-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
          <Search className="h-4 w-4 shrink-0" />
          <div className="flex flex-1 overflow-hidden">
            <div className="line-clamp-1 pr-6">Search</div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-background">
          <form>
            <div className="border-b p-2.5">
              <Input
                type="search"
                placeholder="Search..."
                className="h-8 rounded-sm shadow-none focus-visible:ring-0"
              />
            </div>
          </form>
          <div className="grid gap-1 p-1.5 text-sm">
            {results.map((result) => (
              <Link
                to={result.url}
                key={result.title}
                className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
              >
                <div className="font-medium">{result.title}</div>
                <div className="line-clamp-2 text-muted-foreground">{result.teaser}</div>
              </Link>
            ))}
            <Separator className="my-1.5" />
            <Link
              to="/"
              className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
            >
              See all results
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="flex h-8 w-full min-w-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
        <Search className="h-4 w-4 shrink-0" />
        <div className="flex flex-1 overflow-hidden">
          <div className="line-clamp-1 pr-6">Search</div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" sideOffset={4} className="w-96 bg-background p-0">
        <form>
          <div className="border-b p-2.5">
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 rounded-sm shadow-none focus-visible:ring-0"
            />
          </div>
        </form>
        <div className="grid gap-1 p-1.5 text-sm">
          {results.map((result) => (
            <Link
              to={result.url}
              key={result.title}
              className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
            >
              <div className="font-medium">{result.title}</div>
              <div className="line-clamp-2 text-muted-foreground">{result.teaser}</div>
            </Link>
          ))}
          <Separator className="my-1.5" />
          <Link
            to="/"
            className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
          >
            See all results
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function NavMain({
  className,
  items,
  searchResults,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  searchResults: React.ComponentProps<typeof SidebarSearch>['results'];
} & React.ComponentProps<'ul'>) {
  return (
    <ul className={cn('grid gap-0.5', className)}>
      <li>
        <SidebarSearch results={searchResults} />
      </li>
      {items.map((item) => (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
          <li>
            <div className="relative flex items-center">
              <Link
                to={item.url}
                className="flex h-8 min-w-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <div className="flex flex-1 overflow-hidden">
                  <div className="line-clamp-1 pr-6">{item.title}</div>
                </div>
              </Link>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="px-4 py-0.5">
              <ul className="grid border-l px-2">
                {item.items?.map((subItem) => (
                  <li key={subItem.title}>
                    <Link
                      to={subItem.url}
                      className="flex h-8 min-w-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                    >
                      <div className="line-clamp-1">{subItem.title}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </li>
        </Collapsible>
      ))}
    </ul>
  );
}
