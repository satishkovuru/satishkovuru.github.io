import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/profile.js';
import { education, experience, skills, certifications } from '../data/resume.js';

export default function Resume() {
  return (
    <section className="page resume-page">
      <div className="resume-header">
        <SectionHeading eyebrow="Résumé" title="Experience & Skills" />
        <div className="resume-actions">
          <a className="btn btn-primary" href={profile.resumeFile} download>
            Download PDF
          </a>
          <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>

      <div className="resume-grid">
        <div className="resume-main">
          <div className="resume-block">
            <h3>Experience</h3>
            {experience.map((job) => (
              <div key={job.role} className="resume-item">
                <div className="resume-item-header">
                  <h4>{job.role}</h4>
                  <span className="resume-period">{job.period}</span>
                </div>
                {job.company && <p className="resume-subtitle">{job.company}</p>}
                <ul>
                  {job.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="resume-block">
            <h3>Education</h3>
            {education.map((school) => (
              <div key={school.school} className="resume-item">
                <div className="resume-item-header">
                  <h4>{school.school}</h4>
                  <span className="resume-period">{school.period}</span>
                </div>
                <p className="resume-subtitle">
                  {school.degree}
                  {school.location ? ` — ${school.location}` : ''}
                </p>
                {school.details?.length > 0 && (
                  <ul>
                    {school.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {certifications.length > 0 && (
            <div className="resume-block">
              <h3>Certifications</h3>
              <ul>
                {certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="resume-sidebar">
          <div className="resume-block">
            <h3>Skills</h3>
            {skills.map((group) => (
              <div key={group.category} className="skill-group">
                <h4>{group.category}</h4>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
