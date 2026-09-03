import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenAdminLogin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = !mobileOpen ? 'hidden' : '';
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <span class="logo-symbol">&lt;/&gt;</span>
          <span className="logo-text">Portfolio<span className="accent-dot">.</span></span>
        </a>

        <nav className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="nav-link btn-nav-contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <button 
          className={`hamburger-btn ${mobileOpen ? 'active' : ''}`} 
          onClick={toggleMobile}
          aria-label="Toggle Navigation"
        >
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </button>
      </div>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
        }
        .navbar-header.scrolled {
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-glass);
          padding: 0.85rem 0;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-white);
          font-weight: 800;
          font-size: 1.25rem;
        }
        .logo-symbol {
          font-family: var(--font-mono);
          color: var(--purple-light);
        }
        .accent-dot { color: var(--purple-secondary); }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
          padding: 0.25rem 0;
          transition: color var(--transition-fast);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, var(--purple-secondary), var(--purple-light));
          border-radius: var(--radius-full);
          transition: width var(--transition-normal);
        }
        .nav-link:hover, .nav-link.active { color: var(--text-white); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .btn-nav-contact {
          padding: 0.45rem 1.25rem !important;
          border-radius: var(--radius-full);
          background: var(--purple-dim);
          border: 1px solid var(--border-glass);
          color: var(--purple-light) !important;
        }
        .btn-nav-contact::after { display: none !important; }
        .btn-nav-contact:hover {
          background: var(--purple-primary) !important;
          color: #ffffff !important;
          box-shadow: 0 0 20px var(--purple-glow);
        }
        .hamburger-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 5px;
          padding: 0.5rem;
          z-index: 1001;
        }
        .hamburger-btn .bar {
          display: block;
          width: 24px;
          height: 2px;
          background-color: var(--text-white);
          border-radius: 2px;
          transition: all var(--transition-normal);
        }
        .hamburger-btn.active .bar-1 { transform: translateY(7px) rotate(45deg); }
        .hamburger-btn.active .bar-2 { opacity: 0; }
        .hamburger-btn.active .bar-3 { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 768px) {
          .hamburger-btn { display: flex; }
          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            background: rgba(15, 15, 24, 0.96);
            backdrop-filter: blur(25px);
            border-left: 1px solid var(--border-glass);
            padding: 6rem 2rem 2rem;
            transition: right var(--transition-normal);
            z-index: 1000;
          }
          .nav-menu.open { right: 0; }
          .nav-list {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
}
