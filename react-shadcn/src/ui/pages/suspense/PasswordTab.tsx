import { lazy, useReducer } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { SuspenseLayout } from '@/ui/layouts/SuspenseLayout';

const Toggle = lazy(() => import('./Toggle'));

export default function PasswordTab() {
  const [isVisible, toggleVisibility] = useReducer((state) => !state, false);

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="current">Current password</Label>
        <Input id="current" type="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new">New password</Label>
        <Input id="new" type="password" />
      </div>
      <Button onClick={toggleVisibility}>Toggle</Button>

      {isVisible && (
        <SuspenseLayout>
          <Toggle />
        </SuspenseLayout>
      )}
    </div>
  );
}
