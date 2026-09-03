import React, { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  const coreSkills = [
    { name: 'HTML5 / Semantic Markup', level: 95 },
    { name: 'CSS3 / Flexbox / CSS Grid', level: 92 },
    { name: 'JavaScript (ES6+)', level: 88 },
    { name: 'Responsive & Mobile First', level: 95 }
  ];

  const frameworkSkills = [
    { name: 'React.js & Components', level: 85 },
    { name: 'Tailwind CSS / Styling', level: 90 },
    { name: 'Git & GitHub Version Control', level: 87 },
    { name: 'REST APIs & Fetch Integration', level: 84 }
  ];

  const techPills = [
    { name: 'HTML5', icon: 'fa-brands fa-html5' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt' },
    { name: 'JavaScript', icon: 'fa-brands fa-js' },
    { name: 'React', icon: 'fa-brands fa-react' },
    { name: 'Vite', icon: 'fa-solid fa-bolt' },
    { name: 'Tailwind', icon: 'fa-solid fa-wind' },
    { name: 'Git', icon: 'fa-brands fa-git-alt' },
    { name: 'GitHub', icon: 'fa-brands fa-github' },
    { name: 'Figma', icon: 'fa-brands fa-figma' },
    { name: 'REST APIs', icon: 'fa-solid fa-network-wired' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section skills-section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Skillset</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Competencies</span>
          </h2>
          <p className="section-subtitle">
            The tools and core technologies I use to build scalable web experiences.
          </p>
        </div>

        <div className="skills-grid">
          {/* Group 1 */}
          <div className="skill-group-card glass-card">
            <div className="group-header">
              <div className="group-icon"><i className="fa-brands fa-html5"></i></div>
              <h3>Core Frontend</h3>
            </div>

            <div className="progress-container">
              {coreSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: animated ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2 */}
          <div className="skill-group-card glass-card">
            <div className="group-header">
              <div className="group-icon"><i className="fa-solid fa-code"></i></div>
              <h3>Frameworks & Tooling</h3>
            </div>

            <div className="progress-container">
              {frameworkSkills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ width: animated ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Pills Cloud */}
        <div className="tech-stack-pills">
          {techPills.map((pill, index) => (
            <span className="tech-pill" key={index}>
              <i className={pill.icon}></i> {pill.name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .skill-group-card { padding: 2.25rem; }
        .group-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2rem;
        }
        .group-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--purple-dim);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--purple-light);
          font-size: 1.25rem;
        }
        .group-header h3 { font-size: 1.25rem; font-weight: 700; }
        .progress-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .skill-name { font-size: 0.92rem; font-weight: 500; color: var(--text-white); }
        .skill-percentage {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--purple-light);
        }
        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, var(--purple-dark), var(--purple-secondary), var(--purple-light));
          transition: width 1.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 0 12px var(--purple-glow);
        }
        .tech-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          justify-content: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .tech-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.2rem;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: all var(--transition-fast);
        }
        .tech-pill i { color: var(--purple-light); }
        .tech-pill:hover {
          background: var(--purple-dim);
          border-color: var(--purple-secondary);
          color: var(--text-white);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px var(--purple-glow);
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
