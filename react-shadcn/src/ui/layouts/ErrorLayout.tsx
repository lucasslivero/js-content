import { Link } from 'react-router-dom';

export function ErrorLayout() {
  return (
    <div>
      <h1>A problem has occurred in this route !</h1>
      <span>
        Back to
        <Link className="ml-1 font-bold underline" to="/">
          Home
        </Link>
      </span>
    </div>
  );
}
