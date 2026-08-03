import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/profile.js';

export default function Contact() {
  return (
    <section className="page contact-page">
      <SectionHeading eyebrow="Contact" title="Let's get in touch" />
      <p className="contact-intro">
        I'm actively open to new opportunities and conversations — feel free to reach out.
      </p>
      <div className="contact-cards">
        <a className="contact-card" href={`mailto:${profile.email}`}>
          <span className="contact-label">Email</span>
          <span className="contact-value">{profile.email}</span>
        </a>
        {profile.phone && (
          <a className="contact-card" href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}>
            <span className="contact-label">Phone</span>
            <span className="contact-value">{profile.phone}</span>
          </a>
        )}
        <a className="contact-card" href={profile.github} target="_blank" rel="noreferrer">
          <span className="contact-label">GitHub</span>
          <span className="contact-value">{profile.github.replace('https://', '')}</span>
        </a>
        <a className="contact-card" href={profile.linkedin} target="_blank" rel="noreferrer">
          <span className="contact-label">LinkedIn</span>
          <span className="contact-value">{profile.linkedin.replace('https://', '')}</span>
        </a>
        {profile.location && (
          <div className="contact-card contact-card-static">
            <span className="contact-label">Location</span>
            <span className="contact-value">{profile.location}</span>
          </div>
        )}
      </div>
    </section>
  );
}
