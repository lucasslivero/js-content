import { Counter } from './Counter';
import { UserProfile } from './UserProfile';

export default function ZustandPage() {
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <div className="space-y-10">
        <Counter />
        <UserProfile />
      </div>
    </div>
  );
}
