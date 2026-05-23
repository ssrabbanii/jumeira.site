// Entry disclaimer — shown once per browser session

const DisclaimerModal = () => {
  const [open, setOpen] = React.useState(() => {
    try { return sessionStorage.getItem('jumeira.disclaimerSeen') !== '1'; }
    catch (e) { return true; }
  });

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try { sessionStorage.setItem('jumeira.disclaimerSeen', '1'); } catch (e) {}
  };

  if (!open) return null;

  return (
    <div className="disc-scrim" onClick={dismiss} role="dialog" aria-modal="true" aria-labelledby="disc-title">
      <div className="disc-card" onClick={(e) => e.stopPropagation()}>
        <div className="disc-art">
          <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
            <defs>
              <linearGradient id="discG" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#FF5B6E"/>
                <stop offset="0.55" stopColor="#EA3FA2"/>
                <stop offset="1" stopColor="#4F36E8"/>
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="54" fill="url(#discG)" opacity="0.12"/>
            <circle cx="60" cy="60" r="38" fill="url(#discG)" opacity="0.22"/>
            <g transform="translate(60 60)">
              <path d="M-22 16 L 0 -22 L 22 16 Z"
                    fill="none" stroke="url(#discG)" strokeWidth="3.6"
                    strokeLinejoin="round" strokeLinecap="round"/>
              <line x1="0" y1="-6" x2="0" y2="4" stroke="url(#discG)" strokeWidth="3.6" strokeLinecap="round"/>
              <circle cx="0" cy="10" r="2.2" fill="url(#discG)"/>
            </g>
          </svg>
        </div>
        <span className="disc-eyebrow">PROTOTYPE NOTICE</span>
        <h2 id="disc-title">This website is still being developed by Pinnacel AI.</h2>
        <p>This is not the final one. You're looking at a working prototype that is still evolving — copy, imagery, and flows may change before launch.</p>
        <div className="disc-meta">
          <div>
            <span>Built by</span>
            <strong>Pinnacel AI</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="disc-status"><span className="disc-dot" /> In development</strong>
          </div>
          <div>
            <span>Version</span>
            <strong>Preview 0.4</strong>
          </div>
        </div>
        <div className="disc-actions">
          <button className="cta-pill" onClick={dismiss}>I understand — continue</button>
        </div>
        <p className="disc-foot">Press <kbd>Esc</kbd> or click outside to dismiss.</p>
      </div>
    </div>
  );
};

(() => {
  if (document.getElementById('disclaimer-styles')) return;
  const css = `
  .disc-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.55);
    backdrop-filter: blur(8px);
    z-index: 300;
    display: grid; place-items: center;
    padding: 40px;
    animation: discScrimIn .2s ease;
  }
  @keyframes discScrimIn { from { opacity: 0 } to { opacity: 1 } }
  .disc-card {
    width: 100%;
    max-width: 520px;
    background: #fff;
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 40px 100px rgba(7, 7, 43, 0.45);
    text-align: center;
    animation: discCardIn .28s cubic-bezier(.22,.61,.36,1);
    border: 1px solid var(--border);
  }
  @keyframes discCardIn {
    from { transform: translateY(28px) scale(0.96); opacity: 0; }
    to { transform: none; opacity: 1; }
  }
  .disc-art { display: flex; justify-content: center; margin-bottom: 18px; }
  .disc-eyebrow {
    display: inline-block;
    font-size: 11px; font-weight: 800;
    letter-spacing: 0.14em;
    color: var(--purple);
    background: var(--lav-soft);
    padding: 6px 12px;
    border-radius: 999px;
    margin-bottom: 14px;
  }
  .disc-card h2 {
    font-size: 26px; font-weight: 800;
    line-height: 1.2;
    margin: 0 0 12px;
    letter-spacing: -0.02em;
    color: var(--navy);
    text-wrap: balance;
  }
  .disc-card p {
    color: #3F4163;
    font-size: 15px;
    line-height: 1.55;
    margin: 0 0 24px;
    max-width: 420px;
    margin-left: auto; margin-right: auto;
    text-wrap: pretty;
  }
  .disc-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 16px;
    background: #FAFAFD;
    border-radius: 14px;
    margin-bottom: 22px;
  }
  .disc-meta > div { display: flex; flex-direction: column; gap: 4px; }
  .disc-meta span {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    font-weight: 700;
  }
  .disc-meta strong {
    font-size: 13px;
    color: var(--navy);
    font-weight: 700;
  }
  .disc-status {
    display: inline-flex; align-items: center; gap: 6px;
    justify-content: center;
    color: #C97200 !important;
  }
  .disc-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #FFB152;
    box-shadow: 0 0 0 4px rgba(255, 177, 82, 0.22);
    animation: discPulse 1.6s ease-in-out infinite;
  }
  @keyframes discPulse {
    0%, 100% { box-shadow: 0 0 0 4px rgba(255, 177, 82, 0.22); }
    50% { box-shadow: 0 0 0 8px rgba(255, 177, 82, 0.08); }
  }
  .disc-actions { display: flex; justify-content: center; }
  .disc-actions .cta-pill {
    padding: 14px 28px;
    background: var(--navy);
    font-size: 14px;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .disc-foot {
    font-size: 11px !important;
    color: var(--muted) !important;
    margin: 16px 0 0 !important;
  }
  .disc-foot kbd {
    display: inline-block;
    background: var(--lav-bg);
    border: 1px solid var(--border);
    padding: 1px 6px;
    border-radius: 5px;
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 10px;
    color: var(--navy);
  }
  `;
  const s = document.createElement('style');
  s.id = 'disclaimer-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { DisclaimerModal });
