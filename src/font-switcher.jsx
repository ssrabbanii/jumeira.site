// Font switcher — press "/" to open the palette
// Loads several Google fonts and swaps the entire site's font.

const FONT_OPTIONS = [
  { id: 'inter', name: 'Inter', stack: "'Inter', sans-serif", category: 'Modern · default', sample: 'Geometric and neutral.' },
  { id: 'montserrat', name: 'Montserrat', stack: "'Montserrat', sans-serif", category: 'Geometric sans', sample: 'Crisp and architectural.' },
  { id: 'spacegrotesk', name: 'Space Grotesk', stack: "'Space Grotesk', sans-serif", category: 'Display sans', sample: 'Quirky, slightly futuristic.' },
  { id: 'roboto', name: 'Roboto', stack: "'Roboto', sans-serif", category: 'Neo-grotesque', sample: 'Friendly and rational.' },
  { id: 'opensans', name: 'Open Sans', stack: "'Open Sans', sans-serif", category: 'Humanist sans', sample: 'Open and very readable.' },
  { id: 'cormorant', name: 'Cormorant Garamond', stack: "'Cormorant Garamond', serif", category: 'High-contrast serif', sample: 'Elegant editorial mood.' },
  { id: 'lora', name: 'Lora', stack: "'Lora', serif", category: 'Calligraphic serif', sample: 'Warm, considered, literary.' },
];

// Inject Google Fonts (idempotent)
(() => {
  if (document.getElementById('jumeira-fonts')) return;
  const link = document.createElement('link');
  link.id = 'jumeira-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2'
    + '?family=Montserrat:wght@400;500;600;700;800;900'
    + '&family=Space+Grotesk:wght@400;500;600;700'
    + '&family=Roboto:wght@400;500;700;900'
    + '&family=Open+Sans:wght@400;500;600;700;800'
    + '&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400'
    + '&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400'
    + '&display=swap';
  document.head.appendChild(link);
})();

const FontSwitcher = () => {
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(() => {
    try { return localStorage.getItem('jumeira.font.v2') || 'lora'; } catch (e) { return 'lora'; }
  });
  const [hint, setHint] = React.useState(true);
  const [selectedIdx, setSelectedIdx] = React.useState(0);

  const applyFont = React.useCallback((id) => {
    const opt = FONT_OPTIONS.find(f => f.id === id) || FONT_OPTIONS[0];
    document.documentElement.style.setProperty('--site-font', opt.stack);
    // Some serifs need a slightly different display weight ceiling
    if (opt.category.includes('serif')) {
      document.documentElement.style.setProperty('--display-weight', '700');
    } else {
      document.documentElement.style.setProperty('--display-weight', '800');
    }
    setActiveId(id);
    try { localStorage.setItem('jumeira.font.v2', id); } catch (e) {}
  }, []);

  // Apply persisted font on mount
  React.useEffect(() => { applyFont(activeId); }, []); // eslint-disable-line

  // Hide hint after 6s
  React.useEffect(() => {
    if (!hint) return undefined;
    const t = setTimeout(() => setHint(false), 6000);
    return () => clearTimeout(t);
  }, [hint]);

  // Keyboard: '/' to open, Esc to close, arrow keys to navigate, Enter to apply
  React.useEffect(() => {
    const onKey = (e) => {
      const tag = e.target && e.target.tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable);
      if (e.key === '/' && !inField && !open) {
        e.preventDefault();
        setSelectedIdx(Math.max(0, FONT_OPTIONS.findIndex(f => f.id === activeId)));
        setOpen(true);
        setHint(false);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => (i + 1) % FONT_OPTIONS.length); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx(i => (i - 1 + FONT_OPTIONS.length) % FONT_OPTIONS.length); }
      else if (e.key === 'Enter')     { e.preventDefault(); applyFont(FONT_OPTIONS[selectedIdx].id); setOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, selectedIdx, activeId, applyFont]);

  // Preview on hover/select inside the palette
  React.useEffect(() => {
    if (!open) return;
    applyFont(FONT_OPTIONS[selectedIdx].id);
  }, [open, selectedIdx, applyFont]);

  return (
    <>
      {/* Subtle hint pill — only on initial mount */}
      {hint && !open && (
        <div className="font-hint" onClick={() => { setOpen(true); setHint(false); }}>
          Press <kbd>/</kbd> to swap font
        </div>
      )}
      {open && (
        <div className="font-palette-scrim" onClick={() => setOpen(false)}>
          <div className="font-palette" onClick={(e) => e.stopPropagation()}>
            <header>
              <div>
                <strong>Try a typeface</strong>
                <span>Press <kbd>↑</kbd> <kbd>↓</kbd> to preview · <kbd>Enter</kbd> to keep · <kbd>Esc</kbd> to cancel</span>
              </div>
              <button className="fp-close" onClick={() => setOpen(false)}>✕</button>
            </header>
            <ul>
              {FONT_OPTIONS.map((f, i) => (
                <li
                  key={f.id}
                  className={`${i === selectedIdx ? 'is-on' : ''} ${activeId === f.id ? 'is-current' : ''}`}
                  onMouseEnter={() => setSelectedIdx(i)}
                  onClick={() => { applyFont(f.id); setOpen(false); }}
                  style={{ fontFamily: f.stack }}
                >
                  <div className="fp-row">
                    <div className="fp-name">
                      <strong>{f.name}</strong>
                      <span>{f.category}</span>
                    </div>
                    <div className="fp-sample">Find your perfect luxury stay</div>
                    {activeId === f.id && <span className="fp-check">●</span>}
                  </div>
                </li>
              ))}
            </ul>
            <footer>
              <span>Selecting a font live-updates the whole site.</span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

(() => {
  if (document.getElementById('font-switcher-styles')) return;
  const css = `
  :root { --site-font: 'Lora', serif; --display-weight: 700; }
  body, button, input, textarea, select { font-family: var(--site-font) !important; }

  .font-hint {
    position: fixed;
    bottom: 28px; left: 50%;
    transform: translateX(-50%);
    background: var(--navy);
    color: #fff;
    padding: 11px 18px;
    border-radius: 999px;
    font-size: 13px; font-weight: 600;
    box-shadow: 0 16px 40px rgba(7, 7, 43, 0.25);
    z-index: 88;
    cursor: pointer;
    animation: hintRise 0.4s ease, hintFade 6s linear forwards;
    display: inline-flex; align-items: center; gap: 8px;
  }
  @keyframes hintRise { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translateX(-50%); opacity: 1; } }
  @keyframes hintFade { 0% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }
  .font-hint kbd {
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 2px 8px;
    border-radius: 6px;
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 12px;
  }

  .font-palette-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.42);
    backdrop-filter: blur(6px);
    z-index: 200;
    display: grid; place-items: center;
    animation: scrimIn .15s ease;
    padding: 40px;
  }
  @keyframes scrimIn { from { opacity: 0; } to { opacity: 1; } }
  .font-palette {
    width: 100%; max-width: 580px;
    background: #fff;
    border-radius: 22px;
    box-shadow: 0 32px 80px rgba(7, 7, 43, 0.35);
    overflow: hidden;
    animation: palIn .2s cubic-bezier(.22,.61,.36,1);
  }
  @keyframes palIn { from { transform: translateY(20px) scale(0.98); opacity: 0; } to { transform: none; opacity: 1; } }
  .font-palette header {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 22px 24px;
    border-bottom: 1px solid var(--border);
  }
  .font-palette header strong {
    display: block;
    font-size: 18px; font-weight: 800;
    color: var(--navy);
    margin-bottom: 4px;
  }
  .font-palette header span {
    font-size: 12px; color: var(--muted); font-weight: 500;
  }
  .font-palette kbd {
    display: inline-block;
    background: var(--lav-bg);
    border: 1px solid var(--border);
    padding: 1px 7px;
    border-radius: 6px;
    font-family: 'SF Mono', Menlo, monospace;
    font-size: 11px;
    color: var(--navy);
    margin: 0 2px;
  }
  .fp-close {
    background: none;
    color: var(--muted);
    font-size: 18px;
    width: 32px; height: 32px;
    border-radius: 8px;
    transition: background .12s;
  }
  .fp-close:hover { background: var(--lav-bg); color: var(--navy); }

  .font-palette ul {
    list-style: none;
    margin: 0; padding: 8px;
    max-height: 480px;
    overflow-y: auto;
  }
  .font-palette li {
    padding: 14px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background .12s;
  }
  .font-palette li.is-on { background: var(--lav-soft); }
  .fp-row {
    display: flex; align-items: center; gap: 18px;
  }
  .fp-name { flex: 0 0 auto; min-width: 200px; }
  .fp-name strong {
    display: block;
    font-size: 22px;
    color: var(--navy);
    line-height: 1.1;
  }
  .fp-name span {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: var(--muted);
    font-family: var(--site-font);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 600;
  }
  .fp-sample {
    flex: 1;
    font-size: 16px;
    color: #3F4163;
    line-height: 1.3;
  }
  .fp-check {
    flex: 0 0 auto;
    color: var(--purple);
    font-size: 12px;
  }
  .font-palette footer {
    padding: 12px 24px 18px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--muted);
    text-align: center;
  }
  `;
  const s = document.createElement('style');
  s.id = 'font-switcher-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { FontSwitcher, FONT_OPTIONS });
