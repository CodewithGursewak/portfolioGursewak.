import React, { useState, useEffect } from 'react';

export default function Hero({ onExploreProjects, onContactClick }) {
  const roles = [
    'Frontend Developer',
    'UI/UX Craftsman',
    'React Specialist',
    'Clean Code Enthusiast',
    'Web Experience Creator'
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const displayedText = roles[roleIndex].substring(0, charIndex);

  return (
    <section className="section hero-section" id="home">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="status-pill">
            <span className="status-indicator"></span>
            <span>Available for New Projects & Roles</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Gursewak Singh</span>
          </h1>

          <div className="hero-role-wrapper">
            <span className="role-prefix">Passionate</span>
            <span className="typing-text">{displayedText}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-description">
            I craft clean, aesthetically pleasing, and ultra-responsive frontend web interfaces. 
            Focused on pixel-perfection, smooth micro-interactions, and modern user experiences using clean code.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary" onClick={onExploreProjects}>
              <span>Explore Projects</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={onContactClick}>
              <i className="fa-regular fa-paper-plane"></i>
              <span>Let's Talk</span>
            </a>
          </div>

          <div className="hero-stats-bar">
            <div className="stat-card-mini">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Learning & Building</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card-mini">
              <span className="stat-number">2+</span>
              <span className="stat-label">Completed Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card-mini">
              <span className="stat-number">100%</span>
              <span className="stat-label">Commitment to Quality</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-halo-wrapper">
            <div className="avatar-backdrop-glow"></div>
            <div className="avatar-ring">
              <img 
                src="https://res.cloudinary.com/e8wyohlx/image/upload/v1788438694/WhatsApp_Image_2026-09-03_at_5.59.19_PM_sfa3d9.jpg"
                alt="Gursewak Singh - Frontend Developer" 
                className="avatar-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://res.cloudinary.com/e8wyohlx/image/upload/v1788438694/WhatsApp_Image_2026-09-03_at_5.59.19_PM_sfa3d9.jpg';
                }}
              />
            </div>

            {/* Floating Badges */}
            <div className="floating-badge badge-frontend">
              <div className="badge-icon"><i className="fa-brands fa-react"></i></div>
              <div className="badge-text">
                <span className="badge-title">Frontend Dev</span>
                <span className="badge-subtitle">React · HTML · CSS · JS</span>
              </div>
            </div>

            <div className="floating-badge badge-ui">
              <div className="badge-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <div className="badge-text">
                <span className="badge-title">Modern UI/UX</span>
                <span className="badge-subtitle">Clean & Aesthetic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 8rem;
          padding-bottom: 4rem;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 4rem;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.4rem 1.1rem;
          border-radius: var(--radius-full);
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .status-indicator {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 10px #22c55e;
          animation: pulseStatus 2s infinite;
        }
        @keyframes pulseStatus {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0.85rem;
        }
        .hero-role-wrapper {
          font-family: var(--font-mono);
          font-size: clamp(1.1rem, 2.2vw, 1.45rem);
          color: var(--purple-light);
          margin-bottom: 1.35rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .role-prefix { color: var(--text-muted); }
        .typing-text { color: var(--purple-light); font-weight: 600; }
        .cursor-blink { animation: blinkCursor 0.8s infinite; color: var(--purple-secondary); }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-description {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.75;
          max-width: 530px;
          margin-bottom: 2rem;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 2.75rem;
        }
        .hero-stats-bar {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .stat-card-mini { display: flex; flex-direction: column; }
        .stat-number {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.1;
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
        }
        .hero-visual {
          display: flex;
          justify-content: center;
          position: relative;
        }
        .avatar-halo-wrapper {
          position: relative;
          width: 320px;
          height: 320px;
        }
        .avatar-backdrop-glow {
          position: absolute;
          inset: -15px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--purple-secondary) 0%, rgba(139, 92, 246, 0.1) 70%);
          filter: blur(28px);
          opacity: 0.6;
          animation: glowPulse 5s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          0% { transform: scale(0.95); opacity: 0.45; }
          100% { transform: scale(1.05); opacity: 0.75; }
        }
        .avatar-ring {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, var(--purple-secondary), rgba(168, 85, 247, 0.2), var(--purple-dark));
          box-shadow: 0 0 35px var(--purple-glow);
          overflow: hidden;
        }
        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          display: block;
          background-color: var(--bg-tertiary);
          transition: transform var(--transition-slow);
        }
        .avatar-halo-wrapper:hover .avatar-image {
          transform: scale(1.04);
        }
        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(18, 18, 28, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-glass);
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--purple-dim);
          z-index: 2;
          animation: floatUpDown 4s ease-in-out infinite alternate;
        }
        .badge-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--purple-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--purple-light);
          font-size: 1.1rem;
        }
        .badge-text { display: flex; flex-direction: column; }
        .badge-title { font-size: 0.85rem; font-weight: 700; color: var(--text-white); }
        .badge-subtitle { font-size: 0.72rem; color: var(--text-muted); }
        .badge-frontend { top: -10px; left: -40px; animation-delay: 0s; }
        .badge-ui { bottom: 5px; right: -30px; animation-delay: -2s; }
        @keyframes floatUpDown {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-12px); }
        }

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
          .status-pill, .hero-role-wrapper, .hero-description, .hero-cta-group, .hero-stats-bar {
            margin-left: auto; margin-right: auto; justify-content: center;
          }
          .badge-frontend { left: -15px; }
          .badge-ui { right: -15px; }
        }
        @media (max-width: 480px) {
          .avatar-halo-wrapper { width: 250px; height: 250px; }
          .floating-badge { display: none; }
        }
      `}</style>
    </section>
  );
}
