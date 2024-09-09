import { UserForm } from '@/components/optimistic-updates/UserForm';
import { UsersList } from '@/components/optimistic-updates/UsersList';

export default function OptimisticUpdatePage() {
  return (
    <div className="mt-5 space-y-3">
      <UserForm />
      <UsersList />
    </div>
  );
}
