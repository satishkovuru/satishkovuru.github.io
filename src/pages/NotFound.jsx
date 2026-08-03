import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page not-found-page">
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <Link className="btn btn-primary" to="/">
        Back home
      </Link>
    </section>
  );
}
