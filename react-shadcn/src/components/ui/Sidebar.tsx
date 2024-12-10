import { PanelLeft } from 'lucide-react';
import {
  ComponentProps,
  createContext,
  CSSProperties,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useIsMobile } from '@/app/hooks/useMobile';
import { cn } from '@/app/libs/utils';

import { Button } from './Button';
import { Sheet, SheetContent } from './Sheet';

export const SIDEBAR_STATE_COOKIE = 'sidebar:state';

type SidebarContext = {
  state: 'open' | 'closed';
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContext>({
  state: 'open',
  open: true,
  onOpenChange: () => {},
});

function useSidebar() {
  return useContext(SidebarContext);
}

const SidebarLayout = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    defaultOpen?: boolean;
    className?: string;
  }
>(({ defaultOpen, className, ...props }, ref) => {
  const [open, setOpen] = useState(defaultOpen ?? true);

  const onOpenChange = useCallback((openVal: boolean) => {
    setOpen(openVal);
    document.cookie = `${SIDEBAR_STATE_COOKIE}=${openVal}; path=/; max-age=${60 * 60 * 24 * 7}`;
  }, []);

  const state = open ? 'open' : 'closed';
  const value: SidebarContext = useMemo(
    () => ({ state, open, onOpenChange }),
    [state, open, onOpenChange],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        data-sidebar={state}
        style={
          {
            '--sidebar-width': '16rem',
          } as CSSProperties
        }
        className={cn(
          'flex min-h-screen bg-accent/50 pl-0 transition-all duration-300 ease-in-out data-[sidebar=closed]:pl-0 sm:pl-[--sidebar-width]',
          className,
        )}
        {...props}
      />
    </SidebarContext.Provider>
  );
});
SidebarLayout.displayName = 'SidebarLayout';

const SidebarTrigger = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ className, ...props }, ref) => {
    const { open, onOpenChange } = useSidebar();

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', className)}
        onClick={() => onOpenChange(!open)}
        {...props}
      >
        <PanelLeft className="h-4 w-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = 'SidebarTrigger';

const Sidebar = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children }, ref) => {
    const isMobile = useIsMobile();
    const { open, onOpenChange } = useSidebar();

    const sidebar = (
      <div ref={ref} className={cn('flex h-full flex-col border-r bg-background', className)}>
        {children}
      </div>
    );

    if (isMobile) {
      return (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent
            className="w-[260px] p-0 md:w-[--sidebar-width] [&>button]:hidden"
            side="left"
          >
            {sidebar}
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-[--sidebar-width] transition-all duration-300 ease-in-out md:block [[data-sidebar=closed]_&]:left-[calc(var(--sidebar-width)*-1)]">
        {sidebar}
      </aside>
    );
  },
);
Sidebar.displayName = 'Sidebar';

const SidebarHeader = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center border-b px-2.5 py-2', className)}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center border-t px-2.5 py-2', className)}
        {...props}
      />
    );
  },
);
SidebarFooter.displayName = 'SidebarFooter';

const SidebarContent = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-1 flex-col gap-5 overflow-auto py-4', className)}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = 'SidebarContent';

const SidebarItem = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('grid gap-2 px-2.5', className)} {...props} />;
  },
);
SidebarItem.displayName = 'SidebarItem';

const SidebarLabel = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-1.5 text-xs font-medium text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
SidebarLabel.displayName = 'SidebarLabel';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
};
