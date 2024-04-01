import { UserForm } from '@/components/optimistic-updates/UserForm';
import { UsersList } from '@/components/optimistic-updates/UsersList';

export function OptimisticUpdate() {
  return (
    <div className="mt-10 space-y-3">
      <UserForm />
      <UsersList />
    </div>
  );
}
