// Login / sign-up page

const LoginPage = ({ setView, onLogin }) => {
  const [mode, setMode] = React.useState('signin');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    if (onLogin) onLogin();
    else setView('home');
  };

  return (
    <main className="auth">
      <div className="auth-art">
        <img src={PHOTOS.villa3} alt="" onError={onImgError} />
        <div className="auth-art-overlay" />
        <div className="auth-quote">
          <span className="cta-eyebrow">JUMEIRA · CURATED LUXURY</span>
          <h2>"The villa was beyond every expectation. We're already planning our next stay."</h2>
          <div className="auth-quote-by">
            <div className="quote-avatar"><span>SR</span></div>
            <div>
              <strong>Sienna R.</strong>
              <div className="muted">Booked a Jumeirah villa, April 2026</div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <button className="back-btn" onClick={() => setView('home')}>← Back</button>
        <div className="auth-card">
          <div className="auth-logo">
            <AceLogo size={38} />
            <span>jumeira</span>
          </div>
          <h1>{mode === 'signin' ? 'Welcome back.' : 'Create your account.'}</h1>
          <p className="muted">{mode === 'signin' ? 'Sign in to manage your stays and bookmarks.' : 'Join Jumeira to save and book premium homes.'}</p>

          <div className="auth-tabs">
            <button className={mode === 'signin' ? 'is-on' : ''} onClick={() => setMode('signin')}>Sign in</button>
            <button className={mode === 'signup' ? 'is-on' : ''} onClick={() => setMode('signup')}>Sign up</button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className="form-field">
                <span>Full name</span>
                <input type="text" placeholder="Sienna Rivera" />
              </label>
            )}
            <label className="form-field">
              <span>Email</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@jumeira.com" />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" />
            </label>

            {error && <div className="form-error">{error}</div>}

            <div className="form-row">
              <label className="check-row">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              {mode === 'signin' && <button type="button" className="text-link">Forgot password?</button>}
            </div>

            <button type="submit" className="auth-submit">
              {mode === 'signin' ? 'Sign in' : 'Create account'} <IconArrowRight size={18} stroke={2} />
            </button>

            <div className="auth-or"><span>or continue with</span></div>

            <div className="oauth-row">
              <button type="button" className="oauth-btn" onClick={() => onLogin && onLogin()}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.6 0-1.3-.2-1.9H12v3.6h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.1c1.8-1.7 2.8-4.1 2.8-7z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.1-2.4c-.9.6-2 1-3.5 1-2.7 0-5-1.8-5.8-4.3H3v2.5C4.7 19.7 8.1 22 12 22z"/><path fill="#FBBC05" d="M6.2 13.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9V7.6H3c-.7 1.3-1 2.8-1 4.4s.3 3.1 1 4.4l3.2-2.5z"/><path fill="#EA4335" d="M12 6.4c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.6 14.7 2.7 12 2.7 8.1 2.7 4.7 4.9 3 8.4l3.2 2.5C7 8.4 9.3 6.4 12 6.4z"/></svg>
                Google
              </button>
              <button type="button" className="oauth-btn" onClick={() => onLogin && onLogin()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M16.5 1c.1 1.1-.4 2.2-1.1 3-.7.8-1.9 1.4-3 1.3-.1-1.1.4-2.1 1.1-2.9.7-.8 2-1.4 3-1.4zm3.8 17.4c-.5 1.1-.7 1.6-1.4 2.6-1 1.4-2.4 3.1-4.1 3.1-1.5 0-1.9-1-4-1-2 0-2.4 1-3.9 1-1.7 0-3-1.5-4-2.9-2.8-3.9-3.1-8.5-1.4-11C2.8 8.4 4.9 7.3 6.8 7.3c2 0 3.2 1.1 4.8 1.1 1.5 0 2.5-1.1 4.7-1.1 1.7 0 3.5.9 4.8 2.5-4.2 2.3-3.5 8.3.2 8.6z"/></svg>
                Apple
              </button>
            </div>

            <p className="auth-foot muted">
              {mode === 'signin' ? "Don't have an account? " : 'Already a member? '}
              <button type="button" className="text-link" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

(() => {
  if (document.getElementById('login-styles')) return;
  const css = `
  .auth { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 96px); }
  .auth-art {
    position: relative;
    overflow: hidden;
    margin: 28px 0 28px 52px;
    border-radius: 32px;
  }
  .auth-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .auth-art-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(165deg, rgba(7,7,43,0.5) 0%, rgba(216,49,184,0.18) 60%, rgba(7,7,43,0.7) 100%);
  }
  .auth-quote {
    position: absolute;
    bottom: 36px; left: 36px; right: 36px;
    color: #fff;
  }
  .auth-quote h2 {
    font-size: 28px; line-height: 1.25;
    font-weight: 700;
    color: #fff;
    margin: 14px 0 22px;
    text-wrap: balance;
    max-width: 440px;
  }
  .auth-quote .cta-eyebrow { color: #D9FF3F; }
  .auth-quote-by { display: flex; align-items: center; gap: 12px; }
  .quote-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.3);
    display: grid; place-items: center;
    color: #fff; font-weight: 700; font-size: 13px;
  }
  .auth-quote-by strong { display: block; color: #fff; font-size: 14px; }
  .auth-quote-by .muted { color: rgba(255,255,255,0.7); font-size: 12px; }

  .auth-form-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 60px;
    position: relative;
  }
  .back-btn {
    position: absolute; top: 40px; left: 40px;
    color: var(--muted); font-size: 14px; font-weight: 600;
    padding: 8px 14px; border-radius: 999px;
    transition: background .15s, color .15s;
  }
  .back-btn:hover { background: var(--lav-bg); color: var(--navy); }

  .auth-card { width: 100%; max-width: 420px; }
  .auth-logo { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 26px; }
  .auth-logo span { font-size: 20px; font-weight: 700; color: var(--navy); }
  .auth-card h1 { font-size: 32px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.02em; }
  .auth-card .muted { margin: 0 0 22px; }

  .auth-tabs {
    display: inline-flex;
    padding: 4px;
    background: var(--lav-bg);
    border-radius: 999px;
    margin-bottom: 24px;
  }
  .auth-tabs button {
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 13px; font-weight: 700;
    color: var(--muted);
    transition: background .18s, color .18s;
  }
  .auth-tabs button.is-on { background: #fff; color: var(--navy); box-shadow: var(--shadow-soft); }

  .form-field { display: block; margin-bottom: 16px; }
  .form-field > span {
    display: block;
    font-size: 12px; font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.04em;
    margin-bottom: 8px;
  }
  .form-field input {
    width: 100%; height: 54px;
    background: var(--search-bg);
    border: 1px solid transparent;
    border-radius: 14px;
    padding: 0 18px;
    font-family: inherit; font-size: 15px; font-weight: 500;
    color: var(--navy);
    outline: none;
    transition: background .15s, border-color .15s, box-shadow .15s;
  }
  .form-field input:focus { background: #fff; border-color: var(--purple); box-shadow: 0 0 0 4px rgba(79, 54, 232, 0.12); }

  .form-error {
    background: #FFEFF4; color: #B81E5D;
    padding: 10px 14px; border-radius: 10px;
    font-size: 13px; font-weight: 600;
    margin-bottom: 12px;
  }
  .form-row { display: flex; justify-content: space-between; align-items: center; margin: 6px 0 18px; }
  .check-row { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--navy); cursor: pointer; }
  .check-row input[type="checkbox"] {
    width: 18px; height: 18px;
    appearance: none;
    background: var(--search-bg);
    border: 1px solid #D8D8E6;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }
  .check-row input[type="checkbox"]:checked { background: var(--navy); border-color: var(--navy); }
  .check-row input[type="checkbox"]:checked::after {
    content: ''; position: absolute;
    left: 5px; top: 2px;
    width: 5px; height: 9px;
    border: 2px solid #fff; border-top: none; border-left: none;
    transform: rotate(45deg);
  }
  .text-link {
    font-size: 13px; font-weight: 700;
    color: var(--pink);
    background: none;
  }
  .text-link:hover { text-decoration: underline; text-underline-offset: 3px; }

  .auth-submit {
    width: 100%; height: 56px;
    background: var(--navy);
    color: #fff;
    border-radius: 14px;
    font-size: 15px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .15s, box-shadow .2s, transform .15s;
  }
  .auth-submit:hover { background: #14143F; box-shadow: 0 14px 32px rgba(6,6,39,0.25); transform: translateY(-1px); }

  .auth-or {
    text-align: center;
    position: relative;
    margin: 22px 0;
    color: var(--muted);
    font-size: 12px;
  }
  .auth-or::before, .auth-or::after {
    content: '';
    position: absolute; top: 50%;
    width: 38%; height: 1px;
    background: var(--border);
  }
  .auth-or::before { left: 0; }
  .auth-or::after { right: 0; }

  .oauth-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .oauth-btn {
    height: 50px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    font-size: 14px; font-weight: 600;
    color: var(--navy);
    transition: background .15s, border-color .15s;
  }
  .oauth-btn:hover { background: var(--lav-bg); border-color: #D6D5EA; }
  .auth-foot { text-align: center; margin: 22px 0 0; font-size: 14px; }
  `;
  const s = document.createElement('style');
  s.id = 'login-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { LoginPage });
