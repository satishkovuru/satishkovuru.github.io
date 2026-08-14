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

        {profile.strengths?.length > 0 && (
          <div className="about-block">
            <h3>Strengths</h3>
            <ul className="about-list">
              {profile.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.aiUsage && (
          <div className="about-block">
            <h3>How I Use AI</h3>
            <p>{profile.aiUsage}</p>
          </div>
        )}

        {profile.selectedResults?.length > 0 && (
          <div className="about-block">
            <h3>Selected Results</h3>
            <ul className="about-list">
              {profile.selectedResults.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.currentFocus && (
          <div className="about-block">
            <h3>What I'm Focused On Now</h3>
            <p>{profile.currentFocus}</p>
          </div>
        )}
      </div>
    </section>
  );
}
