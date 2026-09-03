import React, { useState } from 'react';

export default function Contact({ onMessageSent }) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddr: '',
    projectSubject: '',
    inquiryType: 'frontend',
    messageBody: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.emailAddr.trim() || !formData.messageBody.trim()) {
      setFeedback({
        type: 'error',
        text: 'Please fill out all required fields marked with an asterisk (*).'
      });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', text: '' });

    const newMessage = {
      id: 'msg_' + Date.now(),
      name: formData.fullName.trim(),
      email: formData.emailAddr.trim(),
      subject: formData.projectSubject.trim() || 'Portfolio Contact Inquiry',
      category: formData.inquiryType,
      message: formData.messageBody.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      starred: false
    };

    // 1. Save to LocalStorage for Admin Dashboard
    try {
      const existingRaw = localStorage.getItem('portfolio_messages');
      const messages = existingRaw ? JSON.parse(existingRaw) : [];
      messages.unshift(newMessage);
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    } catch (err) {
      console.error('Storage error:', err);
    }

    // 2. Broadcast to other tabs/windows
    try {
      const channel = new BroadcastChannel('portfolio_admin_channel');
      channel.postMessage({ type: 'new_message', message: newMessage });
      setTimeout(() => channel.close(), 1000);
    } catch (err) {}

    // 3. Web3Forms Email Forwarding
    try {
      const web3Key = localStorage.getItem('portfolio_web3forms_key');
      if (web3Key) {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            name: newMessage.name,
            email: newMessage.email,
            subject: newMessage.subject,
            category: newMessage.category,
            message: newMessage.message
          })
        }).catch((e) => console.warn('Web3Forms dispatch error:', e));
      }
    } catch (err) {}

    // 4. Custom REST API endpoint
    try {
      const apiSettingsRaw = localStorage.getItem('portfolio_api_settings');
      if (apiSettingsRaw) {
        const settings = JSON.parse(apiSettingsRaw);
        if (settings.mode === 'rest' && settings.url) {
          fetch(settings.url, {
            method: settings.method || 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessage)
          }).catch((e) => console.warn('REST API error:', e));
        }
      }
    } catch (err) {}

    setTimeout(() => {
      setLoading(false);
      setFeedback({
        type: 'success',
        text: `Thank you, ${formData.fullName}! Your message has been received and saved. I'll get back to you shortly.`
      });

      setFormData({
        fullName: '',
        emailAddr: '',
        projectSubject: '',
        inquiryType: 'frontend',
        messageBody: ''
      });

      if (onMessageSent) {
        onMessageSent(newMessage);
      }
    }, 800);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-subtitle">
            Interested in collaborating or have an open position? Feel free to reach out anytime!
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info-col">
            <div className="contact-lead-box">
              <h3 className="contact-lead-title">Have a project in mind?</h3>
              <p className="contact-lead-text">
                I am currently open to freelance projects, full-time frontend developer roles, and open-source collaborations. Drop a message!
              </p>
            </div>

            <div className="contact-cards-stack">
              <div className="contact-info-tile glass-card">
                <div className="tile-icon"><i className="fa-regular fa-envelope"></i></div>
                <div className="tile-content">
                  <span className="tile-label">Direct Email</span>
                  <a href="mailto:contact@yourname.dev" className="tile-value">contact@yourname.dev</a>
                </div>
              </div>

              <div className="contact-info-tile glass-card">
                <div className="tile-icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="tile-content">
                  <span className="tile-label">Location</span>
                  <span className="tile-value">India / punjab / patiala · Remote Available</span>
                </div>
              </div>

              <div className="contact-info-tile glass-card">
                <div className="tile-icon"><i className="fa-solid fa-briefcase"></i></div>
                <div className="tile-content">
                  <span className="tile-label">Employment Status</span>
                  <span className="tile-value">Available for Frontend Roles</span>
                </div>
              </div>
            </div>

            <div className="socials-wrapper">
              <span className="socials-label">Connect with me:</span>
              <div className="social-icons">
                <a href="https://github.com/CodewithGursewak" target="_blank" rel="noopener noreferrer" className="social-circle" title="GitHub">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/gursewak-singh-2005833aa/" target="_blank" rel="noopener noreferrer" className="social-circle" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-circle" title="Twitter / X">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle" title="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div className="form-wrapper glass-card">
              <h3 className="form-title">Send a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Your Name <span className="required-star">*</span></label>
                    <input 
                      type="text" 
                      id="fullName" 
                      className="form-input" 
                      placeholder="e.g. hrmn exe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailAddr">Email Address <span className="required-star">*</span></label>
                    <input 
                      type="email" 
                      id="emailAddr" 
                      className="form-input" 
                      placeholder="e.g. hrmn@company.com"
                      value={formData.emailAddr}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="projectSubject">Subject</label>
                  <input 
                    type="text" 
                    id="projectSubject" 
                    className="form-input" 
                    placeholder="e.g. Project Consultation / Job Opportunity"
                    value={formData.projectSubject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Interest / Category</label>
                  <select 
                    id="inquiryType" 
                    className="form-input form-select"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="frontend">Frontend Website Development</option>
                    <option value="ui">UI/UX Implementation</option>
                    <option value="hiring">Full-Time / Contract Role</option>
                    <option value="consultation">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="messageBody">Your Message <span className="required-star">*</span></label>
                  <textarea 
                    id="messageBody" 
                    className="form-input form-textarea" 
                    rows="4" 
                    placeholder="Tell me about your project, timeline, or open role..."
                    value={formData.messageBody}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-full" 
                  disabled={loading}
                >
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                  <i className={loading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-paper-plane'}></i>
                </button>

                {feedback.text && (
                  <div className={`form-feedback ${feedback.type}`}>
                    {feedback.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 3rem;
          align-items: start;
        }
        .contact-lead-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem; }
        .contact-lead-text { color: var(--text-muted); font-size: 0.96rem; line-height: 1.7; margin-bottom: 2rem; }
        .contact-cards-stack { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .contact-info-tile {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.2rem 1.5rem;
          border-radius: var(--radius-md);
        }
        .tile-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--purple-dim);
          border: 1px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--purple-light);
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        .tile-content { display: flex; flex-direction: column; }
        .tile-label { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; }
        .tile-value { font-size: 0.95rem; font-weight: 600; color: var(--text-white); text-decoration: none; }
        a.tile-value:hover { color: var(--purple-light); }
        .socials-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.85rem; }
        .social-icons { display: flex; align-items: center; gap: 0.85rem; }
        .social-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 1.05rem;
          transition: all var(--transition-fast);
        }
        .social-circle:hover {
          background: var(--purple-primary);
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px var(--purple-glow);
        }
        .form-wrapper { padding: 2.5rem; }
        .form-title { font-size: 1.35rem; font-weight: 700; margin-bottom: 1.75rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
        .form-group label { font-size: 0.85rem; font-weight: 500; color: var(--text-muted); }
        .required-star { color: #f43f5e; }
        .form-input {
          width: 100%;
          padding: 0.85rem 1.15rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-sm);
          color: var(--text-white);
          font-family: var(--font-main);
          font-size: 0.95rem;
          outline: none;
          transition: all var(--transition-fast);
        }
        .form-input:focus {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--purple-primary);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        .form-select { cursor: pointer; }
        .form-select option { background: var(--bg-secondary); color: var(--text-white); }
        .form-textarea { resize: vertical; min-height: 110px; }
        .form-feedback {
          margin-top: 1rem;
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          text-align: center;
          font-weight: 500;
        }
        .form-feedback.success {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        }
        .form-feedback.error {
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.3);
          color: #fb7185;
        }
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
