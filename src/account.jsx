// Account hub — sidebar with Profile / Trips / Saved / Inbox / Notifications

const SAMPLE_TRIPS = [
  { id: 't1', img: PHOTOS.villa3, title: 'Five Palm Jumeirah Beachfront Villa', dates: 'Jun 12 — Jun 17, 2026', status: 'upcoming', guests: 4, total: '9,820 USD', refId: 'JM-204713' },
  { id: 't2', img: PHOTOS.villa5, title: 'Stylish Luxury Sunshine Villa', dates: 'Mar 4 — Mar 9, 2026', status: 'past', guests: 2, total: '5,100 USD', refId: 'JM-198302' },
  { id: 't3', img: PHOTOS.villa7, title: 'Beach Front Villa in Five Palm Jumeirah', dates: 'Dec 22 — Dec 28, 2025', status: 'past', guests: 5, total: '8,640 USD', refId: 'JM-176412' },
  { id: 't4', img: PHOTOS.villa1, title: 'Architect-Designed Coastal Pavilion', dates: 'Sep 8 — Sep 14, 2026', status: 'upcoming', guests: 6, total: '14,520 USD', refId: 'JM-211098' },
];

const SAMPLE_THREADS = [
  { id: 'm1', name: 'Layla (Host)', initials: 'LA', last: 'I just left the welcome basket at the entrance. Have a wonderful stay!', when: '2m', unread: true,
    villa: 'Five Palm Jumeirah Beachfront Villa',
    msgs: [
      { from: 'host', text: 'Hi Sienna! Looking forward to having you. Your check-in code is 4421.', t: 'Mon · 09:22' },
      { from: 'me', text: 'Thank you Layla! We arrive around 4pm — does that work?', t: 'Mon · 11:04' },
      { from: 'host', text: 'Perfect, the housekeeper will be there to greet you.', t: 'Mon · 11:18' },
      { from: 'host', text: 'I just left the welcome basket at the entrance. Have a wonderful stay!', t: 'Today · 14:32' },
    ]
  },
  { id: 'm2', name: 'Jumeira Concierge', initials: 'JC', last: 'Your dinner at Pierchic is booked for Thursday at 8pm.', when: '3h', unread: false, villa: 'Five Palm Jumeirah Beachfront Villa', msgs: [] },
  { id: 'm3', name: 'Marco (Host)', initials: 'MA', last: 'Thanks for staying with us! Hope you enjoyed it.', when: '2 wk', unread: false, villa: 'Architect-Designed Coastal Pavilion', msgs: [] },
];

const AccountSidebar = ({ active, setActive }) => {
  const items = [
    { id: 'profile', label: 'Profile', Icon: IconUsers },
    { id: 'trips', label: 'My trips', Icon: IconCalendar },
    { id: 'saved', label: 'Saved', Icon: IconHeart },
    { id: 'inbox', label: 'Inbox', Icon: IconShare },
    { id: 'settings', label: 'Settings', Icon: IconAC },
  ];
  return (
    <aside className="acct-side">
      <div className="acct-user">
        <div className="acct-avatar"><span>SR</span></div>
        <div>
          <strong>Sienna Rivera</strong>
          <span className="muted">Premium member · 2026</span>
        </div>
      </div>
      <nav>
        {items.map(it => (
          <button key={it.id} className={`acct-nav ${active === it.id ? 'is-on' : ''}`} onClick={() => setActive(it.id)}>
            <it.Icon size={18} stroke={1.8} />
            <span>{it.label}</span>
          </button>
        ))}
      </nav>
      <div className="acct-status">
        <span className="cta-eyebrow">CONCIERGE</span>
        <p>Need anything? Your concierge is available 24/7.</p>
        <button className="cta-pill">Chat now</button>
      </div>
    </aside>
  );
};

const ProfilePanel = () => (
  <div className="acct-panel">
    <header className="panel-head"><h2>Profile</h2><button className="ghost-btn">Edit</button></header>
    <div className="profile-banner">
      <div className="banner-art"></div>
      <div className="profile-id">
        <div className="big-avatar"><span>SR</span></div>
        <div>
          <h3>Sienna Rivera</h3>
          <p className="muted">Joined March 2024 · 7 trips · 84 saved homes</p>
          <div className="badge-row">
            <span className="badge">⚡ Premium</span>
            <span className="badge">★ Top 1% guest</span>
            <span className="badge">✓ Verified</span>
          </div>
        </div>
      </div>
    </div>
    <div className="info-grid">
      <div className="info-card">
        <span className="muted small">Email</span>
        <strong>sienna@example.com</strong>
      </div>
      <div className="info-card">
        <span className="muted small">Phone</span>
        <strong>+971 50 234 1188</strong>
      </div>
      <div className="info-card">
        <span className="muted small">Government ID</span>
        <strong style={{color: '#1E9B5C'}}>Verified · Passport</strong>
      </div>
      <div className="info-card">
        <span className="muted small">Payment methods</span>
        <strong>Visa •••• 4242</strong>
      </div>
      <div className="info-card">
        <span className="muted small">Language</span>
        <strong>English</strong>
      </div>
      <div className="info-card">
        <span className="muted small">Currency</span>
        <strong>USD</strong>
      </div>
    </div>
    <h3 className="sec-head-h3">Your stays at a glance</h3>
    <div className="stat-tiles">
      <div className="stat-tile"><strong>7</strong><span>Total trips</span></div>
      <div className="stat-tile"><strong>62k USD</strong><span>Lifetime spend</span></div>
      <div className="stat-tile"><strong>4.94</strong><span>Avg guest rating</span></div>
      <div className="stat-tile"><strong>84</strong><span>Saved homes</span></div>
    </div>
  </div>
);

const TripsPanel = ({ onOpenProperty }) => {
  const [tab, setTab] = React.useState('upcoming');
  const trips = SAMPLE_TRIPS.filter(t => t.status === tab);
  return (
    <div className="acct-panel">
      <header className="panel-head"><h2>My trips</h2></header>
      <div className="sub-tabs">
        <button className={tab === 'upcoming' ? 'is-on' : ''} onClick={() => setTab('upcoming')}>Upcoming · 2</button>
        <button className={tab === 'past' ? 'is-on' : ''} onClick={() => setTab('past')}>Past · 5</button>
        <button className={tab === 'cancelled' ? 'is-on' : ''} onClick={() => setTab('cancelled')}>Cancelled</button>
      </div>
      {trips.length === 0 ? (
        <div className="empty-state">
          <p>No {tab} trips yet.</p>
          <button className="cta-pill" onClick={() => onOpenProperty(null)}>Browse stays</button>
        </div>
      ) : (
        <div className="trip-list">
          {trips.map(t => (
            <article key={t.id} className="trip-card">
              <img src={t.img} alt="" />
              <div className="trip-body">
                <span className="prop-label">VILLA · {t.refId}</span>
                <strong>{t.title}</strong>
                <div className="trip-meta">
                  <span><IconCalendar size={14} stroke={1.8} /> {t.dates}</span>
                  <span><IconUsers size={14} stroke={1.8} /> {t.guests} guests</span>
                  <span>{t.total}</span>
                </div>
                <div className="trip-actions">
                  {t.status === 'upcoming' && <button className="cta-pill">Get directions</button>}
                  {t.status === 'upcoming' && <button className="ghost-btn">Message host</button>}
                  {t.status === 'past' && <button className="cta-pill">Write a review</button>}
                  {t.status === 'past' && <button className="ghost-btn">Book again</button>}
                  <button className="ghost-btn">View receipt</button>
                </div>
              </div>
              {t.status === 'upcoming' && (
                <div className="trip-countdown">
                  <strong>28</strong>
                  <span>days to go</span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

const SavedPanel = ({ bookmarks, setBookmarks, onOpenProperty }) => {
  const saved = PROPERTIES.filter(p => bookmarks[p.id]);
  const all = saved.length === 0 ? PROPERTIES.slice(0, 4) : saved;
  return (
    <div className="acct-panel">
      <header className="panel-head"><h2>Saved homes</h2>
        <button className="ghost-btn">+ New wishlist</button>
      </header>
      <div className="wishlist-grid">
        <button className="wishlist-cover">
          <div className="cover-stack">
            {[PHOTOS.villa3, PHOTOS.villa6, PHOTOS.villa7, PHOTOS.villa5].map((src, i) => (
              <div className="stack-tile" key={i}><img src={src} alt="" /></div>
            ))}
          </div>
          <div className="wishlist-meta">
            <strong>Dubai dream list</strong>
            <span className="muted">{all.length} homes · updated today</span>
          </div>
        </button>
        <button className="wishlist-cover">
          <div className="cover-stack alt">
            {[PHOTOS.villa1, PHOTOS.villa4].map((src, i) => (
              <div className="stack-tile" key={i}><img src={src} alt="" /></div>
            ))}
            <div className="stack-tile empty">+5</div>
          </div>
          <div className="wishlist-meta">
            <strong>Honeymoon shortlist</strong>
            <span className="muted">7 homes · 3 destinations</span>
          </div>
        </button>
        <button className="wishlist-cover new">
          <div className="cover-stack empty">
            <IconHeart size={28} />
          </div>
          <div className="wishlist-meta">
            <strong>Create wishlist</strong>
            <span className="muted">Start a new list</span>
          </div>
        </button>
      </div>

      <h3 className="sec-head-h3">All saved · {all.length}</h3>
      <div className="prop-grid">
        {all.map(p => (
          <PropertyCard
            key={p.id}
            property={p}
            onOpen={onOpenProperty}
            bookmarked={!!bookmarks[p.id]}
            onBookmarkToggle={(id) => setBookmarks(prev => ({ ...prev, [id]: !prev[id] }))}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
};

const InboxPanel = () => {
  const [activeId, setActiveId] = React.useState('m1');
  const [draft, setDraft] = React.useState('');
  const active = SAMPLE_THREADS.find(t => t.id === activeId);
  return (
    <div className="acct-panel inbox">
      <header className="panel-head"><h2>Inbox</h2></header>
      <div className="inbox-grid">
        <div className="thread-list">
          {SAMPLE_THREADS.map(t => (
            <button key={t.id} className={`thread ${activeId === t.id ? 'is-on' : ''}`} onClick={() => setActiveId(t.id)}>
              <div className="thread-avatar"><span>{t.initials}</span>{t.unread && <i className="unread-dot" />}</div>
              <div className="thread-body">
                <header><strong>{t.name}</strong><span className="muted small">{t.when}</span></header>
                <p>{t.last}</p>
                <span className="thread-villa">· {t.villa}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="thread-view">
          <header className="thread-head">
            <div className="thread-avatar large"><span>{active.initials}</span></div>
            <div>
              <strong>{active.name}</strong>
              <div className="muted small">{active.villa}</div>
            </div>
            <button className="ghost-btn">View villa</button>
          </header>
          <div className="thread-stream">
            {active.msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.from === 'me' ? 'me' : 'them'}`}>
                <p>{m.text}</p>
                <span>{m.t}</span>
              </div>
            ))}
            {active.msgs.length === 0 && (
              <div className="empty-state"><p>No conversation history yet.</p></div>
            )}
          </div>
          <footer className="thread-compose">
            <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Type a message…" />
            <button className="cta-pill" disabled={!draft.trim()} onClick={() => setDraft('')}>Send</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

const SettingsPanel = () => (
  <div className="acct-panel">
    <header className="panel-head"><h2>Settings</h2></header>
    <div className="setting-grid">
      {[
        { title: 'Notifications', body: 'Choose what we email and push to you.' },
        { title: 'Privacy', body: 'Manage who can see your stays.' },
        { title: 'Sharing', body: 'Auto-share saved homes with travel companions.' },
        { title: 'Two-factor auth', body: 'Add a second step to keep your account secure.' },
        { title: 'Connected accounts', body: 'Google, Apple, calendar sync.' },
        { title: 'Close account', body: 'Permanently remove your account and data.' },
      ].map(s => (
        <div key={s.title} className="setting-card">
          <strong>{s.title}</strong>
          <p>{s.body}</p>
          <button className="ghost-btn">Manage</button>
        </div>
      ))}
    </div>
  </div>
);

const AccountPage = ({ initialTab = 'trips', bookmarks, setBookmarks, onOpenProperty }) => {
  const [active, setActive] = React.useState(initialTab);
  React.useEffect(() => { setActive(initialTab); }, [initialTab]);
  return (
    <main className="account">
      <div className="account-grid">
        <AccountSidebar active={active} setActive={setActive} />
        <div className="account-content">
          {active === 'profile' && <ProfilePanel />}
          {active === 'trips' && <TripsPanel onOpenProperty={onOpenProperty} />}
          {active === 'saved' && <SavedPanel bookmarks={bookmarks} setBookmarks={setBookmarks} onOpenProperty={onOpenProperty} />}
          {active === 'inbox' && <InboxPanel />}
          {active === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </main>
  );
};

(() => {
  if (document.getElementById('account-styles')) return;
  const css = `
  .account { max-width: 1440px; margin: 0 auto; padding: 28px 52px 80px; }
  .account-grid { display: grid; grid-template-columns: 280px 1fr; gap: 36px; align-items: start; }

  .acct-side {
    background: #fff;
    border-radius: 22px;
    padding: 22px;
    box-shadow: var(--shadow-card);
    position: sticky;
    top: 120px;
    border: 1px solid var(--border);
  }
  .acct-user { display: flex; gap: 12px; align-items: center; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
  .acct-avatar {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    color: #fff; display: grid; place-items: center;
    font-weight: 800; font-size: 14px;
  }
  .acct-user strong { display: block; font-size: 15px; }
  .acct-user .muted { font-size: 12px; }
  .acct-side nav { display: flex; flex-direction: column; gap: 4px; padding: 14px 0; }
  .acct-nav {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    color: var(--muted);
    font-size: 14px; font-weight: 600;
    text-align: left;
    transition: background .15s, color .15s;
  }
  .acct-nav:hover { background: var(--lav-bg); color: var(--navy); }
  .acct-nav.is-on { background: var(--navy); color: #fff; }
  .acct-status {
    margin-top: 14px;
    padding: 16px;
    background: linear-gradient(135deg, var(--lav-bg), #fff);
    border-radius: 14px;
  }
  .acct-status .cta-eyebrow { color: var(--purple); font-size: 11px; }
  .acct-status p { font-size: 13px; margin: 8px 0 12px; color: #3F4163; }
  .acct-status .cta-pill { width: 100%; padding: 10px 14px; font-size: 13px; }

  .acct-panel { background: #fff; border-radius: 24px; padding: 32px; box-shadow: var(--shadow-card); border: 1px solid var(--border); }
  .panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
  .panel-head h2 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.01em; }
  .sec-head-h3 { font-size: 17px; font-weight: 800; margin: 28px 0 14px; }

  /* Profile */
  .profile-banner { position: relative; }
  .banner-art {
    height: 140px;
    border-radius: 20px;
    background: linear-gradient(135deg, #FFE0EC 0%, #F1EFFF 50%, #E8F1FA 100%);
    position: relative;
    overflow: hidden;
  }
  .banner-art::before, .banner-art::after {
    content: '';
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,91,110,0.4), transparent 70%);
  }
  .banner-art::before { width: 240px; height: 240px; top: -120px; right: 20%; }
  .banner-art::after { width: 180px; height: 180px; bottom: -90px; left: 30%; background: radial-gradient(circle, rgba(79,54,232,0.3), transparent 70%); }
  .profile-id { display: flex; gap: 20px; align-items: flex-end; padding: 0 24px; margin-top: -50px; position: relative; }
  .big-avatar {
    width: 100px; height: 100px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    color: #fff; display: grid; place-items: center;
    font-weight: 800; font-size: 32px;
    border: 5px solid #fff;
    box-shadow: 0 12px 24px rgba(234, 63, 162, 0.25);
  }
  .profile-id h3 { font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.01em; }
  .profile-id .muted { font-size: 13px; margin: 4px 0 10px; }
  .badge-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .badge { padding: 6px 12px; background: var(--lav-bg); border-radius: 999px; font-size: 12px; font-weight: 700; color: var(--navy); }
  .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
  .info-card { padding: 16px; background: #FAFAFD; border-radius: 14px; }
  .info-card .small { font-size: 12px; }
  .info-card strong { display: block; margin-top: 6px; font-size: 15px; }
  .stat-tiles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
  .stat-tile { padding: 20px; background: linear-gradient(180deg, #FAFAFD, #fff); border-radius: 16px; border: 1px solid var(--border); }
  .stat-tile strong { display: block; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
  .stat-tile span { font-size: 13px; color: var(--muted); margin-top: 4px; display: block; }

  /* Sub tabs */
  .sub-tabs { display: inline-flex; padding: 4px; background: var(--lav-bg); border-radius: 999px; margin-bottom: 22px; }
  .sub-tabs button { padding: 10px 18px; border-radius: 999px; font-size: 13px; font-weight: 700; color: var(--muted); transition: background .15s, color .15s; }
  .sub-tabs button.is-on { background: #fff; color: var(--navy); box-shadow: var(--shadow-soft); }

  /* Trips */
  .trip-list { display: flex; flex-direction: column; gap: 14px; }
  .trip-card {
    display: grid; grid-template-columns: 180px 1fr auto;
    gap: 22px;
    padding: 18px;
    background: #FAFAFD;
    border-radius: 18px;
    align-items: center;
  }
  .trip-card img { width: 180px; height: 130px; border-radius: 14px; object-fit: cover; }
  .trip-body strong { display: block; font-size: 17px; margin: 6px 0 4px; }
  .trip-meta { display: flex; gap: 18px; font-size: 13px; color: var(--muted); margin-bottom: 12px; flex-wrap: wrap; }
  .trip-meta span { display: inline-flex; align-items: center; gap: 6px; }
  .trip-meta span:last-child { font-weight: 700; color: var(--navy); }
  .trip-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .trip-actions .cta-pill, .trip-actions .ghost-btn { padding: 9px 14px; font-size: 13px; }
  .trip-countdown {
    text-align: center;
    padding: 18px 24px;
    background: linear-gradient(135deg, #FFE0EC, #F1EFFF);
    border-radius: 14px;
  }
  .trip-countdown strong { display: block; font-size: 32px; font-weight: 800; letter-spacing: -0.02em; background: linear-gradient(135deg, #FF5B6E, #4F36E8); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .trip-countdown span { font-size: 12px; color: var(--muted); }
  .empty-state { padding: 40px; text-align: center; color: var(--muted); }

  /* Wishlists */
  .wishlist-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 22px; }
  .wishlist-cover {
    text-align: left;
    background: none;
    border-radius: 18px;
    transition: transform .2s;
  }
  .wishlist-cover:hover { transform: translateY(-2px); }
  .cover-stack {
    display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr;
    gap: 4px;
    height: 200px;
    border-radius: 18px;
    overflow: hidden;
  }
  .cover-stack .stack-tile:first-child { grid-row: span 2; }
  .stack-tile { background: #EAD9C7; overflow: hidden; }
  .stack-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .stack-tile.empty { display: grid; place-items: center; background: var(--lav-bg); color: var(--muted); font-weight: 800; font-size: 18px; }
  .cover-stack.empty { display: grid; place-items: center; background: linear-gradient(135deg, #FFE0EC, #F1EFFF); color: var(--purple); }
  .wishlist-meta { padding: 12px 4px 0; }
  .wishlist-meta strong { display: block; font-size: 15px; }
  .wishlist-meta .muted { font-size: 13px; }

  /* Inbox */
  .acct-panel.inbox { padding: 0; overflow: hidden; }
  .acct-panel.inbox .panel-head { padding: 22px 28px; margin: 0; border-bottom: 1px solid var(--border); }
  .inbox-grid { display: grid; grid-template-columns: 340px 1fr; height: 580px; }
  .thread-list { border-right: 1px solid var(--border); overflow-y: auto; }
  .thread {
    display: flex; gap: 12px; padding: 16px 18px;
    border-bottom: 1px solid var(--border);
    width: 100%;
    text-align: left;
    transition: background .15s;
  }
  .thread:hover { background: var(--lav-bg); }
  .thread.is-on { background: var(--lav-soft); }
  .thread-avatar { position: relative; width: 40px; height: 40px; border-radius: 50%; background: var(--lav-soft); color: var(--purple); display: grid; place-items: center; font-weight: 700; font-size: 13px; flex: 0 0 auto; }
  .thread-avatar.large { width: 52px; height: 52px; font-size: 15px; }
  .unread-dot { position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; border-radius: 50%; background: var(--pink); border: 2px solid #fff; }
  .thread-body { flex: 1; min-width: 0; }
  .thread-body header { display: flex; justify-content: space-between; align-items: center; }
  .thread-body header strong { font-size: 14px; }
  .thread-body p { font-size: 13px; color: #555776; margin: 4px 0; line-height: 1.4; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
  .thread-villa { font-size: 11px; color: var(--muted); }

  .thread-view { display: flex; flex-direction: column; min-width: 0; }
  .thread-head { display: flex; align-items: center; gap: 14px; padding: 18px 24px; border-bottom: 1px solid var(--border); }
  .thread-head strong { display: block; font-size: 15px; }
  .thread-head .ghost-btn { margin-left: auto; padding: 10px 16px; font-size: 13px; }
  .thread-stream { flex: 1; padding: 22px 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .bubble { max-width: 70%; padding: 12px 16px; border-radius: 16px; }
  .bubble p { margin: 0; font-size: 14px; line-height: 1.45; }
  .bubble span { display: block; font-size: 11px; opacity: 0.7; margin-top: 4px; }
  .bubble.me { align-self: flex-end; background: var(--navy); color: #fff; border-bottom-right-radius: 6px; }
  .bubble.them { align-self: flex-start; background: var(--lav-bg); color: var(--navy); border-bottom-left-radius: 6px; }
  .thread-compose { display: flex; gap: 10px; padding: 16px 24px; border-top: 1px solid var(--border); }
  .thread-compose input {
    flex: 1; height: 48px;
    background: var(--search-bg);
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 0 16px;
    font-family: inherit; font-size: 14px;
    outline: none;
  }
  .thread-compose input:focus { background: #fff; border-color: var(--purple); }
  .thread-compose .cta-pill { padding: 12px 20px; font-size: 13px; }
  .thread-compose .cta-pill:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Settings */
  .setting-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .setting-card { padding: 22px; background: #FAFAFD; border-radius: 16px; }
  .setting-card strong { display: block; font-size: 15px; margin-bottom: 6px; }
  .setting-card p { font-size: 13px; color: var(--muted); margin: 0 0 14px; }
  .setting-card .ghost-btn { padding: 9px 14px; font-size: 13px; }
  `;
  const s = document.createElement('style');
  s.id = 'account-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { AccountPage, SAMPLE_TRIPS, SAMPLE_THREADS });
