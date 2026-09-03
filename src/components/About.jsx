import React from 'react';

export default function About({ onContactClick }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">About Me</span>
          <h2 className="section-title">
            Turning Ideas Into <span className="gradient-text">Elegant Interfaces</span>
          </h2>
          <p className="section-subtitle">
            A quick glimpse into who I am, what drives me, and how I build digital solutions.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card glass-card">
            <div className="card-icon-header">
              <i className="fa-solid fa-code-commit"></i>
              <h3>My Journey</h3>
            </div>
            <p>
              I believe great frontend development is an art that connects clean visual design with solid, maintainable code. 
              Every component should feel intuitive, responsive, and seamless across any screen size.
            </p>
            <p>
              My workflow centers around writing modular React components, robust CSS with modern layout engines, and writing performant, accessible code without unnecessary bloat.
            </p>
          </div>

          <div className="about-details-card glass-card">
            <h3 className="details-title">Quick Highlights</h3>
            <ul className="details-list">
              <li className="details-item">
                <span className="detail-label"><i className="fa-regular fa-user"></i> Role</span>
                <span className="detail-value">Frontend Web Developer</span>
              </li>
              <li className="details-item">
                <span className="detail-label"><i className="fa-solid fa-palette"></i> Design Focus</span>
                <span className="detail-value">Aesthetic Dark Theme, Glassmorphism</span>
              </li>
              <li className="details-item">
                <span className="detail-label"><i className="fa-solid fa-location-dot"></i> Location</span>
                <span className="detail-value">India (Available Worldwide Remote)</span>
              </li>
              <li className="details-item">
                <span className="detail-label"><i className="fa-solid fa-circle-check" style={{ color: '#22c55e' }}></i> Status</span>
                <span className="detail-value status-highlight">Open to Opportunities</span>
              </li>
            </ul>

            <div className="about-download-cta">
              <a href="#contact" className="btn btn-secondary btn-full" onClick={onContactClick}>
                <i className="fa-solid fa-envelope"></i>
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
        }
        .card-icon-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .card-icon-header i {
          font-size: 1.4rem;
          color: var(--purple-light);
        }
        .card-icon-header h3 {
          font-size: 1.35rem;
          font-weight: 700;
        }
        .about-card p {
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 1.15rem;
          font-size: 0.98rem;
        }
        .about-card p:last-child { margin-bottom: 0; }
        .details-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .details-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }
        .details-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .detail-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .detail-label i { color: var(--purple-light); }
        .detail-value {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-white);
        }
        .status-highlight { color: #4ade80; }
        .about-download-cta { margin-top: 1.75rem; }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
