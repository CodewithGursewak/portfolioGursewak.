import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: '01',
      title: 'AuraMart – Modern E-Commerce UI',
      summary: 'A sleek e-commerce shopping experience featuring category filtering, responsive cart drawer, product search, and smooth modal checkouts.',
      tags: ['React', 'Tailwind CSS', 'REST API'],
      icon: 'fa-solid fa-cart-shopping',
      bannerClass: 'gradient-banner-1'
    },
    {
      id: '02',
      title: 'PulseMetrics – Analytics Dashboard',
      summary: 'Interactive real-time metrics dashboard featuring dynamic revenue graphs, user churn visualization, and responsive dark glass cards.',
      tags: ['JavaScript', 'Chart.js', 'CSS Grid'],
      icon: 'fa-solid fa-chart-pie',
      bannerClass: 'gradient-banner-2'
    },
    {
      id: '03',
      title: 'SkyCast – Minimal Weather App',
      summary: 'A clean minimalist weather application featuring ambient atmospheric background color shifts, location detection, and 5-day forecasts.',
      tags: ['React', 'CSS Animation', 'Fetch API'],
      icon: 'fa-solid fa-cloud-bolt',
      bannerClass: 'gradient-banner-3'
    }
  ];

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Portfolio Showcase</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Featured Works</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications crafted with attention to design precision, speed, and usability.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <article className="project-card glass-card" key={proj.id}>
              <div className="project-preview">
                <div className={`project-banner ${proj.bannerClass}`}>
                  <i className={`${proj.icon} project-banner-icon`}></i>
                  <span className="project-banner-watermark">{proj.id}</span>
                </div>
                <div className="project-overlay-links">
                  <a href="#contact" className="overlay-btn" title="Live Preview">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="overlay-btn" title="Source Code">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>

              <div className="project-info">
                <div className="project-tags">
                  {proj.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
                <h3 className="project-heading">{proj.title}</h3>
                <p className="project-summary">{proj.summary}</p>
                <div className="project-actions">
                  <a href="#contact" className="link-btn">
                    <span>View Case Study</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-cta-footer">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className="fa-brands fa-github"></i>
            <span>Explore More on GitHub</span>
          </a>
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .project-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px var(--purple-dim);
        }
        .project-preview {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }
        .project-banner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform var(--transition-slow);
        }
        .project-card:hover .project-banner { transform: scale(1.05); }
        .gradient-banner-1 { background: linear-gradient(135deg, #1e1338 0%, #2f1754 100%); }
        .gradient-banner-2 { background: linear-gradient(135deg, #151833 0%, #1e2659 100%); }
        .gradient-banner-3 { background: linear-gradient(135deg, #241430 0%, #3e1b52 100%); }
        .project-banner-icon {
          font-size: 3.5rem;
          color: var(--purple-light);
          opacity: 0.35;
          transition: all var(--transition-normal);
        }
        .project-card:hover .project-banner-icon {
          transform: scale(1.1);
          opacity: 0.65;
        }
        .project-banner-watermark {
          position: absolute;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          right: 15px;
          bottom: 5px;
          font-family: var(--font-mono);
        }
        .project-overlay-links {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 15, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        .project-card:hover .project-overlay-links { opacity: 1; }
        .overlay-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid var(--border-glass-hover);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .overlay-btn:hover {
          background: var(--purple-primary);
          transform: scale(1.12);
          box-shadow: 0 0 20px var(--purple-glow);
        }
        .project-info {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background: var(--purple-dim);
          color: var(--purple-light);
          border: 1px solid var(--border-glass);
        }
        .project-heading {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.65rem;
          color: var(--text-white);
        }
        .project-summary {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }
        .project-actions { margin-top: auto; }
        .link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--purple-light);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .link-btn:hover { color: #ffffff; gap: 0.75rem; }
        .projects-cta-footer { text-align: center; }

        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
