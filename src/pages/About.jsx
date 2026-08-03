import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <section className="page about-page">
      <SectionHeading eyebrow="About" title="A little about myself" />
      <div className="about-content">
        {profile.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
