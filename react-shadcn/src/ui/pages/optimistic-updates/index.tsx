import { UserForm } from './UserForm';
import { UsersList } from './UsersList';

export default function OptimisticUpdatePage() {
  return (
    <div className="mt-5 space-y-3">
      <UserForm />
      <UsersList />
    </div>
  );
}
