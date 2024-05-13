import { Link } from 'react-router-dom';

export function Home() {
  return (
    <ul className="list-inside list-disc p-6 text-xl">
      <li>
        <Link to="/file-uploader">File Uploader</Link>
      </li>
      <li>
        <Link to="/optimistic-updates">Optimistic Updates</Link>
      </li>
      <li>
        <Link to="/pagination">Pagination</Link>
      </li>
      <li>
        <Link to="/pagination-infinity-scroll">Pagination with Infinity Scroll</Link>
      </li>
    </ul>
  );
}
