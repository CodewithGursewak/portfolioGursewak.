import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio' | 'admin'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Check login state on initial load
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('portfolio_admin_logged_in') === 'true';
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'admin') {
      if (isLoggedIn) {
        setCurrentView('admin');
      } else {
        setIsLoginModalOpen(true);
      }
    }
  }, []);

  // Listen to real-time BroadcastChannel for incoming messages
  useEffect(() => {
    let channel = null;
    try {
      channel = new BroadcastChannel('portfolio_admin_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'new_message') {
          showToast(`New Inquiry: ${event.data.message.name}`, event.data.message.subject, 'info');
        }
      };
    } catch (e) {}

    return () => {
      if (channel) channel.close();
    };
  }, []);

  const showToast = (title, desc = '', type = 'info') => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setCurrentView('admin');
    showToast('Welcome Admin', 'Dashboard unlocked successfully', 'success');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_logged_in');
    setCurrentView('portfolio');
    showToast('Logged Out', 'Returned to portfolio view', 'info');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      {/* Background ambient orbs */}
      <div className="ambient-glow glow-top-left" aria-hidden="true"></div>
      <div className="ambient-glow glow-bottom-right" aria-hidden="true"></div>

      {/* Real-time Toast Alerts */}
      {toast && (
        <div className="toast-container">
          <div className={`toast toast-${toast.type}`}>
            <i className={`toast-icon fa-solid ${toast.type === 'success' ? 'fa-circle-check' : toast.type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info'}`}></i>
            <div className="toast-body">
              <span className="toast-title">{toast.title}</span>
              {toast.desc && <span className="toast-desc">{toast.desc}</span>}
            </div>
          </div>
        </div>
      )}

      {currentView === 'portfolio' ? (
        <>
          <Navbar onOpenAdminLogin={() => setIsLoginModalOpen(true)} />
          <main>
            <Hero 
              onExploreProjects={() => scrollToSection('projects')}
              onContactClick={() => scrollToSection('contact')}
            />
            <About onContactClick={() => scrollToSection('contact')} />
            <Skills />
            <Projects />
            <Contact 
              onMessageSent={(newMsg) => {
                showToast(`Message Sent!`, `Thank you, ${newMsg.name}`, 'success');
              }} 
            />
          </main>
          <Footer onOpenAdminLogin={() => setIsLoginModalOpen(true)} />
        </>
      ) : (
        <AdminDashboard 
          onBackToSite={() => setCurrentView('portfolio')}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}

      {/* Protected Admin Login Modal */}
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}