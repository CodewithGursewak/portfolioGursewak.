import React from 'react';

export default function Footer({ onOpenAdminLogin }) {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-left">
          <a href="#home" className="brand-logo footer-logo">
            <span className="logo-symbol">&lt;/&gt;</span>
            <span className="logo-text">Portfolio<span className="accent-dot">.</span></span>
          </a>
          <p className="footer-note">Designed by hrmn.</p>
        </div>

        <div className="footer-right">
          <ul className="footer-nav">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button 
                type="button" 
                className="footer-admin-btn"
                onClick={onOpenAdminLogin}
                title="Admin Portal Access"
              >
                <i className="fa-solid fa-shield-halved"></i>
                <span>Admin</span>
              </button>
            </li>
          </ul>
          <p className="copyright-text">&copy; 2026 Gursewak Singh · All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer-section {
          position: relative;
          z-index: 1;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-glass);
          padding: 3rem 0;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .footer-logo { font-size: 1.15rem; margin-bottom: 0.5rem; }
        .footer-note { color: var(--text-subtle); font-size: 0.85rem; }
        .footer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
        }
        .footer-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
        }
        .footer-nav a {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.88rem;
          transition: color var(--transition-fast);
        }
        .footer-nav a:hover { color: var(--purple-light); }
        .footer-admin-btn {
          background: var(--purple-dim);
          border: 1px solid var(--border-glass);
          color: var(--purple-light);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-main);
          transition: all var(--transition-fast);
        }
        .footer-admin-btn:hover {
          background: var(--purple-primary);
          color: #ffffff;
          box-shadow: 0 0 15px var(--purple-glow);
        }
        .copyright-text { font-size: 0.8rem; color: var(--text-subtle); }

        @media (max-width: 768px) {
          .footer-content { flex-direction: column; text-align: center; }
          .footer-right { align-items: center; }
          .footer-nav { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
