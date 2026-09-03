import React, { useState } from 'react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Default Credentials
    if (username.trim() === 'admin' && password.trim() === 'admin123') {
      setLoading(true);
      setTimeout(() => {
        sessionStorage.setItem('portfolio_admin_logged_in', 'true');
        setLoading(false);
        onLoginSuccess();
      }, 500);
    } else {
      setError('Invalid Admin ID or Password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-backdrop active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="admin-login-card glass-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="login-header">
          <div className="login-lock-circle">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2 className="login-title">Admin Portal Access</h2>
          <p className="login-subtitle">Enter your admin credentials to access the messages dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modalUsername"><i className="fa-regular fa-user"></i> Admin ID</label>
            <input 
              type="text" 
              id="modalUsername" 
              className="form-input" 
              placeholder="e.g. admin" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="modalPassword"><i className="fa-solid fa-key"></i> Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="modalPassword" 
                className="form-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
              </button>
            </div>
          </div>

          {error && <div className="login-error-msg">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-login-submit"
            disabled={loading}
          >
            <span>{loading ? 'Access Granted! Loading...' : 'Login to Dashboard'}</span>
            <i className={loading ? 'fa-solid fa-circle-notch fa-spin' : 'fa-solid fa-arrow-right'}></i>
          </button>

          <div className="login-hint">
            <i className="fa-solid fa-circle-info"></i>
            <span>Default ID: <strong>****</strong> | Password: <strong>admin***</strong></span>
          </div>
        </form>
      </div>

      <style>{`
        .admin-login-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5, 5, 10, 0.85);
          backdrop-filter: blur(14px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .admin-login-card {
          width: 100%;
          max-width: 440px;
          padding: 2.5rem;
          position: relative;
          background: rgba(18, 18, 28, 0.95);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px var(--purple-glow);
        }
        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .modal-close-btn:hover {
          background: var(--purple-dim);
          color: var(--text-white);
          border-color: var(--purple-primary);
        }
        .login-header { text-align: center; margin-bottom: 1.85rem; }
        .login-lock-circle {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--purple-dim), rgba(168, 85, 247, 0.2));
          border: 1px solid var(--border-glass);
          color: var(--purple-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 1rem;
          box-shadow: 0 0 25px var(--purple-glow);
        }
        .login-title { font-size: 1.45rem; font-weight: 800; margin-bottom: 0.35rem; }
        .login-subtitle { color: var(--text-muted); font-size: 0.88rem; }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
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
        }
        .form-input:focus {
          border-color: var(--purple-primary);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        .password-input-wrapper { position: relative; }
        .password-input-wrapper .form-input { padding-right: 2.85rem; }
        .toggle-password-btn {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.35rem;
          font-size: 1rem;
        }
        .login-error-msg {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        .btn-login-submit { margin-top: 0.5rem; }
        .login-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          margin-top: 1.25rem;
          font-size: 0.78rem;
          color: var(--text-subtle);
          background: rgba(255, 255, 255, 0.02);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }
        .login-hint strong { color: var(--purple-light); }
      `}</style>
    </div>
  );
}
