// Forced onboarding tour — appears after the disclaimer.
// Users must explore every feature card before they can enter the site.

const TOUR_STEPS = [
  {
    id: 'home', n: '01', title: 'Premium homepage',
    short: 'A cinematic hero, top destinations, featured stays.',
    long: 'The homepage opens with a search module and curated destinations. Tap any villa to dive into its detail page, or use the category cards to browse by property type.',
    tip: 'Look for the hero search bar — it spans Location · Property · Dates · Guests.',
    color: 'pink', icon: 'home',
  },
  {
    id: 'listing', n: '02', title: 'Smart search & filter',
    short: 'Browse hundreds of stays. Filter by anything.',
    long: 'Toggle between grid and list view, open the full filter drawer to dial in price, bedrooms, amenities, and pet-friendly status. Pagination is built in.',
    tip: 'Click "Filters" on the listing page to open the side drawer.',
    color: 'purple', icon: 'search',
  },
  {
    id: 'detail', n: '03', title: 'Rich property pages',
    short: 'Gallery, host, amenities, reviews, map.',
    long: 'Every villa has a full detail page with a five-image gallery, host bio, amenity grid, recent reviews, and a stylised map. The sticky booking card lets you adjust nights and guests in real time.',
    tip: 'Click "Reserve" to start the 3-step checkout.',
    color: 'coral', icon: 'villa',
  },
  {
    id: 'checkout', n: '04', title: 'Three-step checkout',
    short: 'Trip details → Payment → Confirmation.',
    long: 'Walk through trip details, pick a payment method (credit card, Apple Pay, or split-pay), and land on a confirmation screen with a reservation ID.',
    tip: 'Try all three payment options — each has its own UI.',
    color: 'magenta', icon: 'check',
  },
  {
    id: 'trips', n: '05', title: 'My trips',
    short: 'Upcoming, past, and cancelled stays.',
    long: 'Track every reservation. Upcoming trips show a countdown and quick actions: get directions, message host, view receipt. Past trips invite a review or repeat booking.',
    tip: 'Click your avatar → "My trips".',
    color: 'purple', icon: 'calendar',
  },
  {
    id: 'saved', n: '06', title: 'Saved homes & wishlists',
    short: 'Bookmark villas, build trip lists.',
    long: 'Tap the bookmark on any villa to save it. Group saves into themed wishlists — Honeymoon shortlist, Dubai dream list, anything goes.',
    tip: 'The bookmark on Card 1 of the listing is already active.',
    color: 'pink', icon: 'heart',
  },
  {
    id: 'inbox', n: '07', title: 'Inbox & host chat',
    short: 'Conversations with hosts and concierge.',
    long: 'Every booking opens a thread with your host. Concierge messages live alongside. Threads support full chat history and unread indicators.',
    tip: 'Avatar menu → Inbox to see live threads.',
    color: 'navy', icon: 'message',
  },
  {
    id: 'profile', n: '08', title: 'Profile & account',
    short: 'Verified identity, payment methods, stats.',
    long: 'Personal info, identity verification status, saved payment methods, and lifetime stats: total trips, spend, average rating, and saved homes.',
    tip: 'Avatar menu → Profile.',
    color: 'coral', icon: 'user',
  },
  {
    id: 'host-dash', n: '09', title: 'Host dashboard',
    short: 'Earnings, bookings, calendar, reviews.',
    long: 'For property owners. KPIs for the month, an 8-week earnings chart, a to-do list, a recent bookings table, and dedicated tabs for listings, calendar, earnings, and reviews.',
    tip: 'Avatar menu → "Host dashboard".',
    color: 'magenta', icon: 'chart',
  },
  {
    id: 'list', n: '10', title: 'List a property',
    short: 'A seven-step onboarding wizard.',
    long: 'Submit a new listing in seven guided steps: property type, location, space, amenities, photos, pricing, and a final review. Auto-saves between steps.',
    tip: 'Avatar menu → "+ List a property".',
    color: 'purple', icon: 'plus',
  },
  {
    id: 'fonts', n: '11', title: 'Live font switcher',
    short: 'Press / anywhere to try a different typeface.',
    long: 'A built-in command palette swaps the entire site between Inter, Montserrat, Space Grotesk, Roboto, Open Sans, Cormorant Garamond, and Lora. Arrow keys preview, Enter to keep.',
    tip: 'Just press / on your keyboard.',
    color: 'navy', icon: 'type',
  },
  {
    id: 'tweaks', n: '12', title: 'Tweaks panel',
    short: 'Live design knobs — accent, density, navigation.',
    long: 'Open the Tweaks panel (toolbar toggle) to swap accent palettes, card radius, image height, density, and jump to any screen via "Jump to" buttons.',
    tip: 'Look for the Tweaks toggle in the top toolbar.',
    color: 'pink', icon: 'sliders',
  },
];

const TourIcon = ({ kind, size = 28 }) => {
  const p = { size, stroke: 1.8 };
  switch (kind) {
    case 'home': return <IconHouse {...p} />;
    case 'search': return <IconSearch {...p} />;
    case 'villa': return <IconVilla {...p} />;
    case 'check': return <IconCheck {...p} />;
    case 'calendar': return <IconCalendar {...p} />;
    case 'heart': return <IconHeart size={size} />;
    case 'message': return <IconShare {...p} />;
    case 'user': return <IconUsers {...p} />;
    case 'plus': return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
    case 'type': return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8V5h16v3" />
        <path d="M12 5v15M9 20h6" />
      </svg>
    );
    case 'chart': return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 20V8M10 20v-8M16 20V4M22 20H2" />
      </svg>
    );
    case 'sliders': return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/>
        <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/>
        <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/>
      </svg>
    );
    default: return null;
  }
};

const TOUR_KEY = 'jumeira.tourSeenV2';
const SEEN_KEY = 'jumeira.tourExploredV2';

const TourModal = ({ onComplete }) => {
  // Synced with disclaimer: only open after disclaimer dismissed and tour not yet completed
  const [open, setOpen] = React.useState(false);
  const [explored, setExplored] = React.useState(() => {
    try { return new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) || '[]')); }
    catch (e) { return new Set(); }
  });
  const [activeStep, setActiveStep] = React.useState(null);

  // Poll on mount and on storage change for disclaimer state
  React.useEffect(() => {
    const check = () => {
      let seenDisc = false, seenTour = false;
      try {
        seenDisc = sessionStorage.getItem('jumeira.disclaimerSeen') === '1';
        seenTour = sessionStorage.getItem(TOUR_KEY) === '1';
      } catch (e) {}
      if (seenDisc && !seenTour) setOpen(true);
      else if (seenTour) setOpen(false);
    };
    check();
    const id = setInterval(check, 300);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll while tour is open
  React.useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const markSeen = React.useCallback((id) => {
    setExplored(prev => {
      const next = new Set(prev);
      next.add(id);
      try { sessionStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(next))); } catch (e) {}
      return next;
    });
  }, []);

  const finish = () => {
    try { sessionStorage.setItem(TOUR_KEY, '1'); } catch (e) {}
    setOpen(false);
    onComplete && onComplete();
  };

  // ESC inside detail view closes it (not the whole tour)
  React.useEffect(() => {
    if (!activeStep) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setActiveStep(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeStep]);

  if (!open) return null;

  const total = TOUR_STEPS.length;
  const exploredCount = explored.size;
  const allDone = exploredCount === total;
  const pct = Math.round((exploredCount / total) * 100);

  const stepIdx = activeStep ? TOUR_STEPS.findIndex(s => s.id === activeStep.id) : -1;
  const goNextStep = () => {
    markSeen(activeStep.id);
    if (stepIdx < total - 1) setActiveStep(TOUR_STEPS[stepIdx + 1]);
    else setActiveStep(null);
  };
  const goPrevStep = () => {
    if (stepIdx > 0) setActiveStep(TOUR_STEPS[stepIdx - 1]);
  };

  return (
    <div className="tour-root" role="dialog" aria-modal="true" aria-labelledby="tour-title">
      <div className="tour-bg" />
      <div className="tour-shell">
        <header className="tour-head">
          <div>
            <span className="cta-eyebrow">GUIDED TOUR · BY PINNACEL AI</span>
            <h2 id="tour-title">Get to know Jumeira before you explore.</h2>
            <p>Tap every card to see what's been built. Once you've explored all twelve, we'll let you into the site.</p>
          </div>
          <div className="tour-progress">
            <svg viewBox="0 0 64 64" width="84" height="84">
              <defs>
                <linearGradient id="progG" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#FF5B6E"/>
                  <stop offset="0.6" stopColor="#EA3FA2"/>
                  <stop offset="1" stopColor="#4F36E8"/>
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="26" stroke="#ECECF4" strokeWidth="6" fill="none"/>
              <circle
                cx="32" cy="32" r="26"
                stroke="url(#progG)" strokeWidth="6" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 163.36} 163.36`}
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dasharray .35s ease' }}
              />
              <text x="32" y="36" textAnchor="middle" fontFamily="inherit" fontSize="14" fontWeight="800" fill="#060627">{exploredCount}/{total}</text>
            </svg>
          </div>
        </header>

        <div className="tour-grid">
          {TOUR_STEPS.map((s) => (
            <button
              key={s.id}
              className={`tour-card tone-${s.color} ${explored.has(s.id) ? 'is-done' : ''}`}
              onClick={() => setActiveStep(s)}
            >
              <header>
                <span className="tour-card-num">{s.n}</span>
                {explored.has(s.id) && <span className="tour-check"><IconCheck size={14} stroke={2.4} /></span>}
              </header>
              <div className="tour-card-icon"><TourIcon kind={s.icon} size={28} /></div>
              <strong>{s.title}</strong>
              <span>{s.short}</span>
              <footer>
                <span className="tour-card-cta">{explored.has(s.id) ? 'View again' : 'Open card'} →</span>
              </footer>
            </button>
          ))}
        </div>

        <footer className="tour-foot">
          <div className="tour-foot-meta">
            <strong>{exploredCount}/{total}</strong> features explored
            <div className="tour-bar"><span style={{ width: pct + '%' }} /></div>
          </div>
          <button
            className={`cta-pill big tour-enter ${allDone ? '' : 'is-disabled'}`}
            onClick={() => allDone && finish()}
            disabled={!allDone}
            title={allDone ? 'Enter Jumeira' : `Explore the remaining ${total - exploredCount} card${total - exploredCount === 1 ? '' : 's'} to continue`}
          >
            {allDone ? 'Enter the platform' : `Explore ${total - exploredCount} more to continue`}
            <IconArrowRight size={18} stroke={2.2} />
          </button>
        </footer>
      </div>

      {/* Detail card */}
      {activeStep && (
        <div className="tour-detail-scrim" onClick={() => setActiveStep(null)}>
          <article
            className={`tour-detail tone-${activeStep.color}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="tour-detail-close" onClick={() => setActiveStep(null)} aria-label="Close">
              <IconClose size={20} />
            </button>
            <header>
              <div className="tour-detail-icon"><TourIcon kind={activeStep.icon} size={32} /></div>
              <div>
                <span className="cta-eyebrow">{activeStep.n} OF {total}</span>
                <h3>{activeStep.title}</h3>
              </div>
            </header>
            <p className="tour-detail-body">{activeStep.long}</p>
            <div className="tour-detail-tip">
              <strong>How to find it</strong>
              <span>{activeStep.tip}</span>
            </div>
            <footer>
              <button className="ghost-btn" onClick={goPrevStep} disabled={stepIdx === 0}>← Previous</button>
              <button className="cta-pill" onClick={goNextStep}>
                {explored.has(activeStep.id) ? 'Continue' : 'Got it'} <IconArrowRight size={16} stroke={2} />
              </button>
            </footer>
          </article>
        </div>
      )}
    </div>
  );
};

(() => {
  if (document.getElementById('tour-styles')) return;
  const css = `
  .tour-root {
    position: fixed; inset: 0;
    z-index: 260;
    background:
      radial-gradient(900px 600px at 12% -10%, rgba(255, 91, 110, 0.18), transparent 70%),
      radial-gradient(800px 600px at 110% 10%, rgba(79, 54, 232, 0.20), transparent 70%),
      linear-gradient(180deg, #0B0B30 0%, #160F4A 60%, #2A1F7A 100%);
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
  }
  .tour-bg {
    display: none;
  }
  .tour-shell {
    max-width: 1100px;
    margin: 0 auto;
    min-height: 100dvh;
    padding: 56px 32px 200px;
    color: #fff;
    animation: tourIn .5s cubic-bezier(.22,.61,.36,1);
  }
  @keyframes tourIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  .tour-head {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 32px;
    margin-bottom: 36px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
  }
  .tour-head .cta-eyebrow {
    color: #D9FF3F;
    font-size: 11px;
  }
  .tour-head h2 {
    color: #fff;
    font-size: 36px;
    line-height: 1.1;
    margin: 12px 0 10px;
    letter-spacing: -0.02em;
    text-wrap: balance;
    font-weight: 800;
  }
  .tour-head p {
    color: rgba(255,255,255,0.72);
    font-size: 15px;
    margin: 0;
    max-width: 520px;
    line-height: 1.5;
  }
  .tour-progress {
    flex: 0 0 auto;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 50%;
    width: 96px; height: 96px;
    display: grid; place-items: center;
    backdrop-filter: blur(10px);
  }
  .tour-progress text { fill: #fff; }

  .tour-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }
  .tour-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px;
    padding: 18px 18px 16px;
    color: #fff;
    text-align: left;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .2s, box-shadow .2s;
    backdrop-filter: blur(10px);
    display: flex; flex-direction: column;
    gap: 10px;
    min-height: 200px;
  }
  .tour-card:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.25);
    transform: translateY(-3px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  }
  .tour-card header {
    display: flex; justify-content: space-between; align-items: center;
  }
  .tour-card-num {
    font-size: 11px; font-weight: 800; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.5);
  }
  .tour-card-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: grid; place-items: center;
  }
  .tour-card strong {
    font-size: 16px;
    line-height: 1.25;
    color: #fff;
    font-weight: 800;
    text-wrap: balance;
  }
  .tour-card > span {
    font-size: 13px;
    color: rgba(255,255,255,0.72);
    line-height: 1.45;
    flex: 1;
    text-wrap: pretty;
  }
  .tour-card footer { display: flex; }
  .tour-card-cta {
    font-size: 12px; font-weight: 700;
    color: #fff;
    opacity: 0.85;
  }
  .tour-check {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #D9FF3F;
    color: #060627;
    display: grid; place-items: center;
    box-shadow: 0 6px 16px rgba(217, 255, 63, 0.35);
  }
  .tour-card.is-done {
    border-color: rgba(217, 255, 63, 0.35);
    background: linear-gradient(135deg, rgba(217, 255, 63, 0.08), rgba(255, 255, 255, 0.04));
  }
  .tour-card.is-done .tour-card-cta { opacity: 1; color: #D9FF3F; }

  /* Tones */
  .tour-card.tone-pink .tour-card-icon { background: linear-gradient(135deg, #FF5B6E, #EA3FA2); color: #fff; }
  .tour-card.tone-purple .tour-card-icon { background: linear-gradient(135deg, #4F36E8, #2A1FA8); color: #fff; }
  .tour-card.tone-coral .tour-card-icon { background: linear-gradient(135deg, #FFB152, #FF5B6E); color: #fff; }
  .tour-card.tone-magenta .tour-card-icon { background: linear-gradient(135deg, #EA3FA2, #D931B8); color: #fff; }
  .tour-card.tone-navy .tour-card-icon { background: linear-gradient(135deg, #060627, #2A1F7A); color: #fff; }

  .tour-foot {
    position: sticky;
    bottom: 24px;
    margin-top: 40px;
    padding: 16px 22px;
    background: rgba(11, 11, 48, 0.85);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(20px);
    border-radius: 22px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 18px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }
  .tour-foot-meta { color: #fff; font-size: 14px; flex: 1; }
  .tour-foot-meta strong { font-size: 16px; font-weight: 800; }
  .tour-bar {
    margin-top: 8px;
    height: 5px;
    background: rgba(255,255,255,0.12);
    border-radius: 999px;
    overflow: hidden;
    max-width: 320px;
  }
  .tour-bar span {
    display: block; height: 100%;
    background: linear-gradient(90deg, #FF5B6E, #EA3FA2, #D9FF3F);
    transition: width .35s ease;
    border-radius: 999px;
  }
  .tour-enter {
    background: #D9FF3F;
    color: #060627;
    border-radius: 999px;
    padding: 14px 22px;
    font-size: 14px;
    font-weight: 800;
    display: inline-flex; align-items: center; gap: 8px;
    white-space: nowrap;
    transition: transform .15s, box-shadow .2s, background .15s;
  }
  .tour-enter:not(.is-disabled):hover {
    background: #E8FF66;
    transform: translateY(-1px);
    box-shadow: 0 16px 36px rgba(217, 255, 63, 0.45);
  }
  .tour-enter.is-disabled {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.5);
    cursor: not-allowed;
  }

  /* Detail card */
  .tour-detail-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.65);
    backdrop-filter: blur(8px);
    z-index: 270;
    display: grid; place-items: center;
    padding: 28px;
    animation: tdScrim .15s ease;
  }
  @keyframes tdScrim { from { opacity: 0 } to { opacity: 1 } }
  .tour-detail {
    width: 100%;
    max-width: 520px;
    background: #fff;
    border-radius: 24px;
    padding: 32px 32px 26px;
    color: var(--navy);
    position: relative;
    animation: tdIn .25s cubic-bezier(.22,.61,.36,1);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.45);
  }
  @keyframes tdIn { from { transform: translateY(20px) scale(0.97); opacity: 0; } to { transform: none; opacity: 1; } }
  .tour-detail-close {
    position: absolute;
    top: 18px; right: 18px;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--lav-bg);
    color: var(--navy);
    display: grid; place-items: center;
    transition: background .15s;
  }
  .tour-detail-close:hover { background: var(--lav-soft); }

  .tour-detail header { display: flex; gap: 16px; align-items: center; margin-bottom: 14px; }
  .tour-detail-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: grid; place-items: center;
    color: #fff;
    flex: 0 0 auto;
  }
  .tour-detail.tone-pink .tour-detail-icon { background: linear-gradient(135deg, #FF5B6E, #EA3FA2); }
  .tour-detail.tone-purple .tour-detail-icon { background: linear-gradient(135deg, #4F36E8, #2A1FA8); }
  .tour-detail.tone-coral .tour-detail-icon { background: linear-gradient(135deg, #FFB152, #FF5B6E); }
  .tour-detail.tone-magenta .tour-detail-icon { background: linear-gradient(135deg, #EA3FA2, #D931B8); }
  .tour-detail.tone-navy .tour-detail-icon { background: linear-gradient(135deg, #060627, #2A1F7A); }
  .tour-detail h3 {
    margin: 4px 0 0;
    font-size: 24px;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--navy);
    font-weight: 800;
    text-wrap: balance;
  }
  .tour-detail-body {
    color: #3F4163;
    font-size: 15px;
    line-height: 1.55;
    margin: 14px 0 16px;
    text-wrap: pretty;
  }
  .tour-detail-tip {
    background: var(--lav-bg);
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 20px;
  }
  .tour-detail-tip strong {
    display: block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--purple);
    margin-bottom: 4px;
    text-transform: uppercase;
  }
  .tour-detail-tip span { font-size: 14px; color: var(--navy); font-weight: 500; }
  .tour-detail > footer {
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px;
  }
  .tour-detail > footer .ghost-btn { padding: 11px 18px; font-size: 13px; }
  .tour-detail > footer .ghost-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .tour-detail > footer .cta-pill { padding: 12px 20px; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; }

  /* Responsive */
  @media (max-width: 1100px) {
    .tour-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 760px) {
    .tour-shell { padding: 28px 16px 260px; }
    .tour-head { flex-direction: column; align-items: flex-start; gap: 18px; }
    .tour-head h2 { font-size: 26px; }
    .tour-head p { font-size: 14px; }
    .tour-progress { width: 76px; height: 76px; align-self: flex-end; }
    .tour-progress svg { width: 70px; height: 70px; }
    .tour-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .tour-card { min-height: 180px; padding: 14px; }
    .tour-card strong { font-size: 15px; }
    .tour-card > span { font-size: 12px; }
    .tour-foot {
      flex-direction: column; align-items: stretch;
      bottom: 12px;
      padding: 14px;
      gap: 12px;
    }
    .tour-foot-meta { text-align: center; }
    .tour-foot-meta .tour-bar { margin-left: auto; margin-right: auto; }
    .tour-enter { width: 100%; justify-content: center; }
    .tour-detail { padding: 24px 20px 18px; border-radius: 20px; }
    .tour-detail h3 { font-size: 20px; }
    .tour-detail-icon { width: 48px; height: 48px; }
    .tour-detail > footer { flex-direction: column-reverse; align-items: stretch; }
    .tour-detail > footer button { width: 100%; justify-content: center; }
  }
  @media (max-width: 420px) {
    .tour-grid { grid-template-columns: 1fr; }
    .tour-card { min-height: auto; }
  }
  `;
  const s = document.createElement('style');
  s.id = 'tour-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { TourModal, TOUR_STEPS });
