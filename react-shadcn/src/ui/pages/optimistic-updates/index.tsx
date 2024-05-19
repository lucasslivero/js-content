import { UserForm } from '@/components/optimistic-updates/UserForm';
import { UsersList } from '@/components/optimistic-updates/UsersList';

export function OptimisticUpdate() {
  return (
    <div className="mt-5 space-y-3">
      <UserForm />
      <UsersList />
    </div>
  );
}
