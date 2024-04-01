import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 px-10 py-2">
      <div className="flex items-baseline gap-4">
        <h1 className="text-3xl font-bold -tracking-wider">JStack</h1>
        <small className="text-muted-foreground">Create our projects.</small>
      </div>

      <ThemeSwitcher />
    </header>
  );
}
