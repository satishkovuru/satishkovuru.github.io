import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="eyebrow">Hi, I'm</p>
        <h1>{profile.name}</h1>
        <h2 className="hero-role">{profile.role}</h2>
        <p className="hero-tagline">{profile.tagline}</p>

        <div className="hero-actions">
          <Link className="btn btn-primary" to="/resume">
            View Resume
          </Link>
          <Link className="btn btn-secondary" to="/contact">
            Get in Touch
          </Link>
        </div>

        <dl className="hero-highlights">
          {profile.highlights.map((h) => (
            <div key={h.label} className="highlight">
              <dt>{h.value}</dt>
              <dd>{h.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
