import React, { useState, useEffect } from 'react';

const INITIAL_SAMPLES = [
  {
    id: 'msg_sample_1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@innovatech.io',
    subject: 'Senior Frontend Developer Role (Remote)',
    category: 'hiring',
    message: "Hi Harman,\n\nI came across your portfolio website and was truly impressed by the clean layout, glassmorphism design, and smooth interactions. We have an open Senior Frontend role on our product team (React, TypeScript, Tailwind) and would love to chat about your availability.\n\nBest regards,\nSarah Mitchell",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false,
    starred: true
  },
  {
    id: 'msg_sample_2',
    name: 'David Chen',
    email: 'david@zenithstudio.design',
    subject: 'E-commerce Landing Page Redesign',
    category: 'frontend',
    message: "Hello! We are looking for a skilled frontend developer to collaborate on redesigning our direct-to-consumer store with responsive dark-mode styling and micro-animations. Could you share your quote and timeline for a 3-week sprint?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    read: false,
    starred: false
  }
];

export default function AdminDashboard({ onBackToSite, onLogout, showToast }) {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // REST API & Web3Forms Settings
  const [apiSettings, setApiSettings] = useState({
    mode: 'local',
    url: '',
    method: 'POST',
    apiKey: '',
    web3Key: ''
  });
  const [apiTestResult, setApiTestResult] = useState('');

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('portfolio_messages');
      if (raw) {
        setMessages(JSON.parse(raw));
      } else {
        setMessages(INITIAL_SAMPLES);
        localStorage.setItem('portfolio_messages', JSON.stringify(INITIAL_SAMPLES));
      }

      const rawSettings = localStorage.getItem('portfolio_api_settings');
      const web3Key = localStorage.getItem('portfolio_web3forms_key') || '';
      if (rawSettings) {
        setApiSettings({ ...JSON.parse(rawSettings), web3Key });
      } else {
        setApiSettings((prev) => ({ ...prev, web3Key }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state to localStorage whenever messages change
  const saveMessages = (updated) => {
    setMessages(updated);
    try {
      localStorage.setItem('portfolio_messages', JSON.stringify(updated));
      const channel = new BroadcastChannel('portfolio_admin_channel');
      channel.postMessage({ type: 'messages_updated' });
      setTimeout(() => channel.close(), 1000);
    } catch (e) {}
  };

  // Actions
  const toggleStar = (id, e) => {
    if (e) e.stopPropagation();
    const updated = messages.map((m) => m.id === id ? { ...m, starred: !m.starred } : m);
    saveMessages(updated);
  };

  const toggleRead = (id, e) => {
    if (e) e.stopPropagation();
    const updated = messages.map((m) => m.id === id ? { ...m, read: !m.read } : m);
    saveMessages(updated);
  };

  const deleteMessage = (id, e) => {
    if (e) e.stopPropagation();
    const updated = messages.filter((m) => m.id !== id);
    saveMessages(updated);
    if (selectedMessage?.id === id) setSelectedMessage(null);
    showToast('Message Deleted', '', 'error');
  };

  const markAllRead = () => {
    const updated = messages.map((m) => ({ ...m, read: true }));
    saveMessages(updated);
    showToast('All messages marked as read', '', 'success');
  };

  const clearAllMessages = () => {
    if (window.confirm('Delete ALL messages?')) {
      saveMessages([]);
      showToast('Inbox cleared', '', 'info');
    }
  };

  const seedSampleData = () => {
    const newMsg = {
      id: 'msg_' + Date.now(),
      name: 'Alexander Wright',
      email: 'alex.wright@cloudscale.net',
      subject: 'Freelance Design System Implementation',
      category: 'ui',
      message: "Hi Harman, we love your modern frontend aesthetics. Are you taking on contract work this month?",
      createdAt: new Date().toISOString(),
      read: false,
      starred: false
    };
    saveMessages([newMsg, ...messages]);
    showToast('Sample Inquiry Added', 'Added 1 demo message', 'success');
  };

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `portfolio_messages_${new Date().toISOString().slice(0, 10)}.json`);
    dl.click();
    showToast('Exported to JSON', 'File downloaded', 'success');
  };

  const openDetails = (msg) => {
    if (!msg.read) {
      toggleRead(msg.id);
    }
    setSelectedMessage(msg);
  };

  const handleSaveApiSettings = () => {
    try {
      localStorage.setItem('portfolio_api_settings', JSON.stringify({
        mode: apiSettings.mode,
        url: apiSettings.url,
        method: apiSettings.method,
        apiKey: apiSettings.apiKey
      }));
      if (apiSettings.web3Key) {
        localStorage.setItem('portfolio_web3forms_key', apiSettings.web3Key.trim());
      } else {
        localStorage.removeItem('portfolio_web3forms_key');
      }
      setApiModalOpen(false);
      showToast('Settings Saved', 'API and Web3Forms keys updated', 'success');
    } catch (e) {}
  };

  const testApiEndpoint = async () => {
    if (!apiSettings.url) {
      setApiTestResult('Please enter an endpoint URL first.');
      return;
    }
    setApiTestResult('Pinging endpoint...');
    try {
      const res = await fetch(apiSettings.url, { method: 'GET' });
      setApiTestResult(`✓ Responded with HTTP ${res.status} (${res.statusText})`);
    } catch (err) {
      setApiTestResult(`Connection Notice: ${err.message}`);
    }
  };

  // Metrics
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
  const starredCount = messages.filter((m) => m.starred).length;

  // Filtered List
  const filteredMessages = messages.filter((m) => {
    if (activeTab === 'unread' && m.read) return false;
    if (activeTab === 'starred' && !m.starred) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="admin-dashboard-root">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-nav-container">
          <div className="brand-group">
            <div className="brand-logo" onClick={onBackToSite} style={{ cursor: 'pointer' }}>
              <span className="logo-symbol">&lt;/&gt;</span>
              <span className="logo-text">Portfolio<span className="accent-dot">.</span></span>
            </div>
            <div className="admin-badge">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Admin Portal</span>
            </div>
          </div>

          <div className="search-box-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by sender, email, subject, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => setApiModalOpen(true)}>
              <i className="fa-solid fa-network-wired"></i> REST API
            </button>
            <button className="btn btn-secondary btn-sm" onClick={onBackToSite}>
              <i className="fa-solid fa-arrow-left"></i> View Site
            </button>
            <button className="btn btn-danger-subtle btn-sm" onClick={onLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="dashboard-heading-row">
            <div>
              <h1 className="page-title">Inquiries & <span className="gradient-text">Messages Inbox</span></h1>
              <p className="page-subtitle">Real-time incoming submissions from your portfolio contact form.</p>
            </div>
            <div className="dashboard-top-actions">
              <button className="btn-subtle" onClick={seedSampleData}>
                <i className="fa-solid fa-flask"></i> Seed Demo Data
              </button>
              <button className="btn-subtle" onClick={exportJson}>
                <i className="fa-solid fa-download"></i> Export JSON
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <div className="stat-icon-wrapper icon-purple"><i className="fa-solid fa-inbox"></i></div>
              <div className="stat-data">
                <span className="stat-label">Total Messages</span>
                <span className="stat-value">{totalCount}</span>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon-wrapper icon-green"><i className="fa-solid fa-envelope-open-text"></i></div>
              <div className="stat-data">
                <span className="stat-label">Unread Inquiries</span>
                <span className="stat-value">{unreadCount}</span>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon-wrapper icon-amber"><i className="fa-solid fa-star"></i></div>
              <div className="stat-data">
                <span className="stat-label">Starred / Priority</span>
                <span className="stat-value">{starredCount}</span>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon-wrapper icon-blue"><i className="fa-solid fa-bolt"></i></div>
              <div className="stat-data">
                <span className="stat-label">Sync Mode</span>
                <span className="stat-value-text">{apiSettings.mode === 'rest' ? 'REST API' : 'Local Storage'}</span>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="toolbar-card glass-card">
            <div className="filter-tabs">
              <button className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
                All ({totalCount})
              </button>
              <button className={`filter-tab ${activeTab === 'unread' ? 'active' : ''}`} onClick={() => setActiveTab('unread')}>
                Unread ({unreadCount})
              </button>
              <button className={`filter-tab ${activeTab === 'starred' ? 'active' : ''}`} onClick={() => setActiveTab('starred')}>
                Starred ({starredCount})
              </button>
            </div>

            <div className="toolbar-filters">
              <select 
                className="filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend Dev</option>
                <option value="ui">UI/UX Design</option>
                <option value="hiring">Job / Hiring</option>
                <option value="consultation">Consultation</option>
              </select>

              <button className="btn btn-secondary btn-sm" onClick={markAllRead}>
                <i className="fa-solid fa-check-double"></i> Mark All Read
              </button>
              <button className="btn btn-danger btn-sm" onClick={clearAllMessages}>
                <i className="fa-regular fa-trash-can"></i> Clear All
              </button>
            </div>
          </div>

          {/* Message List */}
          <div className="messages-container">
            {filteredMessages.length === 0 ? (
              <div className="empty-state glass-card">
                <i className="fa-solid fa-folder-open empty-icon"></i>
                <h3>No Messages Found</h3>
                <p>Inquiries submitted through your portfolio contact form will appear here automatically.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div 
                  className={`message-card ${!msg.read ? 'unread' : ''}`} 
                  key={msg.id}
                  onClick={() => openDetails(msg)}
                >
                  <div className="msg-avatar">
                    {msg.name.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="msg-content-preview">
                    <div className="msg-header-line">
                      {!msg.read && <span className="unread-dot"></span>}
                      <span className="msg-sender-name">{msg.name}</span>
                      <span className="msg-sender-email">&lt;{msg.email}&gt;</span>
                      <span className="category-pill">{msg.category}</span>
                    </div>
                    <div className="msg-subject-line">
                      <span className="msg-subject">{msg.subject}</span>
                      <span className="msg-snippet">— {msg.message.replace(/\n/g, ' ')}</span>
                    </div>
                  </div>

                  <div className="msg-side-actions">
                    <span className="msg-time">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>

                    <button 
                      className={`action-icon-btn ${msg.starred ? 'starred' : ''}`} 
                      onClick={(e) => toggleStar(msg.id, e)}
                    >
                      <i className={`${msg.starred ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
                    </button>

                    <button className="action-icon-btn" onClick={(e) => toggleRead(msg.id, e)}>
                      <i className={msg.read ? 'fa-regular fa-envelope' : 'fa-regular fa-envelope-open'}></i>
                    </button>

                    <a 
                      href={`mailto:${encodeURIComponent(msg.email)}?subject=${encodeURIComponent('Re: ' + msg.subject)}`}
                      className="action-icon-btn" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fa-solid fa-reply"></i>
                    </a>

                    <button className="action-icon-btn danger" onClick={(e) => deleteMessage(msg.id, e)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="modal-backdrop active" onClick={() => setSelectedMessage(null)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="category-pill">{selectedMessage.category}</span>
              <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <h2>{selectedMessage.subject}</h2>
              <div className="sender-card">
                <div>
                  <strong>{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="message-full-text">{selectedMessage.message}</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger-subtle btn-sm" onClick={() => deleteMessage(selectedMessage.id)}>
                Delete
              </button>
              <a 
                href={`mailto:${encodeURIComponent(selectedMessage.email)}?subject=${encodeURIComponent('Re: ' + selectedMessage.subject)}`}
                className="btn btn-primary btn-sm"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* REST API Modal */}
      {apiModalOpen && (
        <div className="modal-backdrop active" onClick={() => setApiModalOpen(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>REST API & Web3Forms Integration</h2>
              <button className="modal-close-btn" onClick={() => setApiModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Web3Forms Access Key (Email Forwarding to Gmail)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. a1b2c3d4-xxxx-xxxx-xxxx"
                  value={apiSettings.web3Key}
                  onChange={(e) => setApiSettings({ ...apiSettings, web3Key: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>REST API Endpoint URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="http://localhost:5000/api/messages"
                  value={apiSettings.url}
                  onChange={(e) => setApiSettings({ ...apiSettings, url: e.target.value })}
                />
              </div>

              <button className="btn btn-secondary btn-sm" onClick={testApiEndpoint}>
                Test Connection
              </button>
              {apiTestResult && <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>{apiTestResult}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary btn-sm" onClick={handleSaveApiSettings}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-dashboard-root { min-height: 100vh; background: var(--bg-primary); }
        .admin-header {
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-glass);
          padding: 0.9rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .admin-nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        .brand-group { display: flex; align-items: center; gap: 1rem; }
        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-white);
          font-weight: 800;
          font-size: 1.15rem;
        }
        .logo-symbol { font-family: var(--font-mono); color: var(--purple-light); }
        .accent-dot { color: var(--purple-secondary); }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          background: var(--purple-dim);
          border: 1px solid var(--border-glass);
          color: var(--purple-light);
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
        }
        .search-box-wrapper { position: relative; flex: 1; max-width: 450px; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-subtle); }
        .search-input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-full);
          color: var(--text-white);
          outline: none;
        }
        .header-actions { display: flex; align-items: center; gap: 0.75rem; }
        .btn-danger-subtle {
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .btn-danger-subtle:hover { background: rgba(239, 68, 68, 0.12); color: #ef4444; }
        .dashboard-main { padding: 2.5rem 2rem; }
        .dashboard-container { max-width: 1400px; margin: 0 auto; }
        .dashboard-heading-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; }
        .page-title { font-size: 2rem; font-weight: 800; }
        .page-subtitle { color: var(--text-muted); font-size: 0.95rem; }
        .dashboard-top-actions { display: flex; gap: 0.65rem; }
        .btn-subtle {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          cursor: pointer;
        }
        .btn-subtle:hover { color: var(--text-white); border-color: var(--border-glass); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
        .stat-icon-wrapper {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center; font-size: 1.35rem;
        }
        .icon-purple { background: var(--purple-dim); color: var(--purple-light); }
        .icon-green { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
        .icon-amber { background: rgba(245, 158, 11, 0.12); color: #fbbf24; }
        .icon-blue { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
        .stat-data { display: flex; flex-direction: column; }
        .stat-label { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600; }
        .stat-value { font-size: 1.85rem; font-weight: 800; color: var(--text-white); }
        .stat-value-text { font-size: 1.05rem; font-weight: 700; color: var(--text-white); }
        .toolbar-card {
          padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 1.5rem;
        }
        .filter-tabs { display: flex; gap: 0.5rem; }
        .filter-tab {
          background: transparent; border: none; color: var(--text-muted);
          padding: 0.5rem 1rem; border-radius: var(--radius-full); cursor: pointer; font-weight: 600;
        }
        .filter-tab.active { background: var(--purple-dim); color: var(--purple-light); border: 1px solid var(--border-glass); }
        .toolbar-filters { display: flex; align-items: center; gap: 0.85rem; }
        .filter-select {
          padding: 0.5rem 1rem; background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass); border-radius: var(--radius-sm); color: var(--text-white);
        }
        .btn-danger { background: rgba(239, 68, 68, 0.12); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.25); }
        .btn-danger:hover { background: #ef4444; color: #ffffff; }
        .messages-container { display: flex; flex-direction: column; gap: 0.85rem; }
        .message-card {
          background: var(--bg-card); border: 1px solid var(--border-glass);
          border-radius: var(--radius-md); padding: 1.25rem 1.5rem;
          display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1.25rem;
          cursor: pointer;
        }
        .message-card:hover { transform: translateY(-2px); border-color: var(--border-glass-hover); }
        .message-card.unread { border-left: 4px solid var(--purple-light); background: rgba(26, 22, 42, 0.6); }
        .unread-dot { width: 8px; height: 8px; background: var(--purple-secondary); border-radius: 50%; display: inline-block; margin-right: 0.4rem; }
        .msg-avatar {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, var(--purple-dark), var(--purple-secondary));
          display: flex; align-items: center; justify-content: center; font-weight: 700;
        }
        .msg-content-preview { display: flex; flex-direction: column; gap: 0.35rem; overflow: hidden; }
        .msg-header-line { display: flex; align-items: center; gap: 0.75rem; }
        .msg-sender-name { font-weight: 600; }
        .msg-sender-email { font-size: 0.82rem; color: var(--text-muted); }
        .category-pill {
          padding: 0.15rem 0.6rem; border-radius: var(--radius-full); font-size: 0.72rem;
          background: var(--purple-dim); color: var(--purple-light); border: 1px solid var(--border-glass);
          text-transform: uppercase;
        }
        .msg-subject-line { display: flex; align-items: center; gap: 0.5rem; }
        .msg-subject { font-weight: 500; font-size: 0.92rem; }
        .msg-snippet { font-size: 0.85rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .msg-side-actions { display: flex; align-items: center; gap: 0.75rem; }
        .msg-time { font-size: 0.78rem; color: var(--text-subtle); }
        .action-icon-btn {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted); display: flex; align-items: center; justify-content: center;
          cursor: pointer;
        }
        .action-icon-btn:hover { color: var(--purple-light); border-color: var(--purple-primary); }
        .action-icon-btn.starred { color: #fbbf24; }
        .action-icon-btn.danger:hover { color: #f87171; border-color: #ef4444; }
        .empty-state { text-align: center; padding: 4rem; display: flex; flex-direction: column; align-items: center; }
        .empty-icon { font-size: 2.5rem; color: var(--purple-light); margin-bottom: 1rem; }
        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(5, 5, 10, 0.75); backdrop-filter: blur(12px);
          z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;
        }
        .modal-box { width: 100%; max-width: 620px; padding: 2.25rem; border-radius: var(--radius-lg); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .modal-close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2rem; }
        .message-full-text {
          background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md); padding: 1.25rem; margin: 1.5rem 0; white-space: pre-wrap;
        }
        .modal-footer { display: flex; justify-content: space-between; align-items: center; }
      `}</style>
    </div>
  );
}
