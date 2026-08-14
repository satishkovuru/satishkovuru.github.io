import SectionHeading from '../components/SectionHeading.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  return (
    <section className="page projects-page">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        subtitle="A few selected projects — edit src/data/projects.js to add your own."
      />
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <h3>{project.title}</h3>
            {project.meta && <p className="project-meta">{project.meta}</p>}
            <p>{project.description}</p>
            <div className="skill-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            {project.link && (
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                {project.linkLabel || 'View'} →
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
