import { Link } from 'react-router-dom';

export function Home() {
  return (
    <ul className="list-inside list-disc p-6 text-xl">
      <li>
        <Link to="/optimistic-updates">Optimistic Updates</Link>
      </li>
      <li>
        <Link to="/pagination">Pagination + Infinity Scroll</Link>
      </li>
    </ul>
  );
}
