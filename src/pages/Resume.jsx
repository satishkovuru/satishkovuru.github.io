import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import ExperienceItem from '../components/ExperienceItem.jsx';
import { profile } from '../data/profile.js';
import { education, experience, skills, achievements, frameworks, certifications } from '../data/resume.js';

const TABS = [
  { id: 'experience', label: 'Experience' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
];

export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience');
  const [skillFilter, setSkillFilter] = useState('All');

  const filteredSkills = useMemo(
    () => (skillFilter === 'All' ? skills : skills.filter((g) => g.category === skillFilter)),
    [skillFilter]
  );

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

      {achievements.length > 0 && (
        <dl className="metrics-strip">
          {achievements.map((a) => (
            <div key={a.label} className="metric-card">
              <dt>{a.value}</dt>
              <dd>{a.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="resume-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`resume-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`tab-panel resume-block ${activeTab === 'experience' ? 'active' : ''}`}>
        {experience.map((job) => (
          <ExperienceItem key={`${job.company}-${job.role}`} job={job} />
        ))}
      </div>

      <div className={`tab-panel ${activeTab === 'frameworks' ? 'active' : ''}`}>
        <p className="frameworks-intro">
          What I actually built and led at each role — not just a count of tests.
        </p>
        <div className="framework-list">
          {frameworks.map((fw) => (
            <div key={fw.company} className="framework-card">
              <p className="framework-company">{fw.company}</p>
              <h4>{fw.title}</h4>
              <p className="framework-description">{fw.description}</p>
              <div className="skill-tags">
                {fw.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`tab-panel resume-block ${activeTab === 'education' ? 'active' : ''}`}>
        {education.map((school) => (
          <div key={school.school} className="resume-item">
            <div className="resume-item-header">
              <div>
                <h4>{school.school}</h4>
                <p className="resume-subtitle">
                  {school.degree}
                  {school.location ? ` — ${school.location}` : ''}
                </p>
              </div>
              <span className="resume-period">{school.period}</span>
            </div>
            {school.details?.length > 0 && (
              <ul className="resume-details expanded">
                {school.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {certifications.length > 0 && (
          <>
            <h3 className="resume-subheading">Certifications</h3>
            <ul className="resume-plain-list">
              {certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className={`tab-panel ${activeTab === 'skills' ? 'active' : ''}`}>
        <div className="skill-filters">
          <button
            type="button"
            className={`filter-chip ${skillFilter === 'All' ? 'active' : ''}`}
            onClick={() => setSkillFilter('All')}
          >
            All
          </button>
          {skills.map((g) => (
            <button
              key={g.category}
              type="button"
              className={`filter-chip ${skillFilter === g.category ? 'active' : ''}`}
              onClick={() => setSkillFilter(g.category)}
            >
              {g.category}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((group) => (
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
      </div>
    </section>
  );
}
