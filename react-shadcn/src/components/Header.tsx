import { Link } from 'react-router-dom';

import { ThemeSwitcher } from './ThemeSwitcher';
import { SidebarTrigger } from './ui/Sidebar';

export function Header() {
  return (
    <header className="sticky top-0 flex h-[60px] items-center justify-between border-b-2 bg-default px-10 py-2">
      <div className="flex items-baseline gap-4">
        <SidebarTrigger />
        <h1 className="cursor-pointer text-3xl font-bold -tracking-wider">
          <Link to="/">JStack</Link>
        </h1>
        <small className="text-muted-foreground">Create your projects.</small>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
