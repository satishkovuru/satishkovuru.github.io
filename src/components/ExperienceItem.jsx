import { useState } from 'react';

export default function ExperienceItem({ job }) {
  const [expanded, setExpanded] = useState(false);

  function toggle() {
    setExpanded((e) => !e);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }

  return (
    <div className="resume-item">
      <div
        className="resume-item-header resume-item-header--clickable"
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <div>
          <h4>{job.role}</h4>
          {job.company && (
            <p className="resume-subtitle">
              {job.company}
              {job.location ? ` — ${job.location}` : ''}
            </p>
          )}
        </div>
        <span className="resume-period">
          {job.period}
          <span className={`resume-chevron ${expanded ? 'open' : ''}`} aria-hidden="true">
            ▾
          </span>
        </span>
      </div>

      {!expanded && job.summary && <p className="resume-summary">{job.summary}</p>}

      <ul className={`resume-details ${expanded ? 'expanded' : ''}`}>
        {job.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}
