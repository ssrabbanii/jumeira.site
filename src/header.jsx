// Jumeira header: top nav + category nav
// Original "A" mark: chunky rounded A with a cutout triangle, pink gradient stroke.

const AceLogo = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="Jumeira logo">
    <defs>
      <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF5B6E" />
        <stop offset="55%" stopColor="#EA3FA2" />
        <stop offset="100%" stopColor="#D931B8" />
      </linearGradient>
    </defs>
    {/* Outer rounded A */}
    <path
      d="M7 33 L18 6.5 a2.6 2.6 0 0 1 4.8 0 L33 33"
      stroke="url(#logoG)"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Crossbar */}
    <path d="M12.5 24 L27.5 24" stroke="url(#logoG)" strokeWidth="3.6" strokeLinecap="round" />
    {/* Small accent dot */}
    <circle cx="20" cy="17" r="2.2" fill="url(#logoG)" />
  </svg>
);

const LangPill = () => (
  <button className="lang-pill">
    EN
    <IconChevron size={14} stroke={2} />
  </button>
);

const FlagUS = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ display: 'block', borderRadius: '50%' }}>
    <defs>
      <clipPath id="circUS"><circle cx="16" cy="16" r="16" /></clipPath>
    </defs>
    <g clipPath="url(#circUS)">
      <rect width="32" height="32" fill="#fff" />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} y={2 + i * 4.3} width="32" height="2.5" fill="#D7283A" />
      ))}
      <rect width="14" height="13.5" fill="#1B3A8B" />
      {/* Stars */}
      {Array.from({length: 9}).map((_, i) => {
        const r = Math.floor(i / 3), c = i % 3;
        return <circle key={i} cx={2.6 + c * 4.4} cy={2.4 + r * 4.4} r="0.7" fill="#fff" />;
      })}
    </g>
    <circle cx="16" cy="16" r="15.5" fill="none" stroke="#E5E5EF" strokeWidth="1" />
  </svg>
);

const TopNav = ({ view, setView, searchValue, setSearchValue, isLoggedIn, onLogout, onAccountTab }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  React.useEffect(() => {
    if (mobileOpen || mobileSearchOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, mobileSearchOpen]);

  const navItems = [
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'rent', label: 'Rent' },
    { id: 'contact', label: 'Contact us' },
  ];

  const isNavActive = (id) => {
    if (id === 'buy') return ['buy', 'listing', 'detail', 'checkout'].includes(view);
    if (id === 'sell') return ['host', 'host-dash', 'list'].includes(view);
    if (id === 'rent') return view === 'rent';
    if (id === 'contact') return view === 'contact';
    return false;
  };

  const doNav = (id) => {
    setMobileOpen(false);
    if (id === 'buy') setView('buy');
    if (id === 'rent') setView('rent');
    if (id === 'sell') setView('host');
    if (id === 'contact') setView('contact');
  };

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <button className="logo-wrap" onClick={() => setView('home')} aria-label="Jumeira home">
          <AceLogo />
          <span className="logo-text">jumeira</span>
        </button>

        <button className="lang-pill desktop-only">
          EN
          <IconChevron size={14} stroke={2} />
        </button>

        <div className="search-bar desktop-only">
          <IconSearch size={20} stroke={1.8} />
          <input
            type="text"
            placeholder="Search villas, locations, hosts…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <nav className="nav-links desktop-only">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${isNavActive(item.id) ? 'is-active' : ''}`}
              onClick={() => doNav(item.id)}
            >
              {isNavActive(item.id) && <span className="nav-highlight" aria-hidden="true" />}
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <span className="nav-divider desktop-only" aria-hidden="true" />

        <button className="currency desktop-only">
          <FlagUS size={28} />
          <span>USD</span>
          <IconChevron size={14} stroke={2} />
        </button>

        {isLoggedIn ? (
          <div className="user-wrap desktop-only" ref={menuRef}>
            <button className="user-pill" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="user-avatar">SR</span>
              <IconChevron size={16} stroke={2} />
            </button>
            {menuOpen && (
              <div className="user-menu">
                <div className="user-menu-head">
                  <div className="user-avatar lg">SR</div>
                  <div>
                    <strong>Sienna Rivera</strong>
                    <span>sienna@example.com</span>
                  </div>
                </div>
                <button onClick={() => { setMenuOpen(false); onAccountTab && onAccountTab('profile'); }}>Profile</button>
                <button onClick={() => { setMenuOpen(false); onAccountTab && onAccountTab('trips'); }}>My trips</button>
                <button onClick={() => { setMenuOpen(false); onAccountTab && onAccountTab('saved'); }}>Saved homes</button>
                <button onClick={() => { setMenuOpen(false); onAccountTab && onAccountTab('inbox'); }}>Inbox</button>
                <button onClick={() => { setMenuOpen(false); onAccountTab && onAccountTab('settings'); }}>Settings</button>
                <div className="user-menu-div"></div>
                <button onClick={() => { setMenuOpen(false); setView('host-dash'); }}>Host dashboard</button>
                <button onClick={() => { setMenuOpen(false); setView('list'); }}>+ List a property</button>
                <div className="user-menu-div"></div>
                <button onClick={() => { setMenuOpen(false); onLogout && onLogout(); }}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn desktop-only" onClick={() => setView('login')}>Login</button>
        )}

        {/* Mobile-only controls */}
        <div className="mobile-actions mobile-only">
          <button className="icon-btn" aria-label="Search" onClick={() => setMobileSearchOpen(true)}>
            <IconSearch size={20} stroke={2} />
          </button>
          <button className="icon-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-bar">
            <IconSearch size={20} stroke={1.8} />
            <input
              type="text"
              autoFocus
              placeholder="Search villas, locations, hosts…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={() => setMobileSearchOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="mobile-scrim" onClick={() => setMobileOpen(false)} />
          <aside className="mobile-drawer" role="dialog" aria-label="Menu">
            <header>
              <div className="logo-wrap">
                <AceLogo size={32} />
                <span className="logo-text">jumeira</span>
              </div>
              <button className="icon-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <IconClose size={22} />
              </button>
            </header>
            {isLoggedIn && (
              <div className="mob-user">
                <div className="user-avatar lg">SR</div>
                <div>
                  <strong>Sienna Rivera</strong>
                  <span>sienna@example.com</span>
                </div>
              </div>
            )}
            <nav className="mob-nav">
              <span className="mob-label">Browse</span>
              {navItems.map(it => (
                <button key={it.id} onClick={() => doNav(it.id)}>{it.label}</button>
              ))}
              {isLoggedIn && <>
                <span className="mob-label">Account</span>
                <button onClick={() => { setMobileOpen(false); onAccountTab && onAccountTab('profile'); }}>Profile</button>
                <button onClick={() => { setMobileOpen(false); onAccountTab && onAccountTab('trips'); }}>My trips</button>
                <button onClick={() => { setMobileOpen(false); onAccountTab && onAccountTab('saved'); }}>Saved homes</button>
                <button onClick={() => { setMobileOpen(false); onAccountTab && onAccountTab('inbox'); }}>Inbox</button>
                <span className="mob-label">Host</span>
                <button onClick={() => { setMobileOpen(false); setView('host-dash'); }}>Host dashboard</button>
                <button onClick={() => { setMobileOpen(false); setView('list'); }}>+ List a property</button>
              </>}
            </nav>
            <footer className="mob-foot">
              <button className="currency">
                <FlagUS size={24} />
                <span>USD</span>
                <IconChevron size={14} stroke={2} />
              </button>
              {isLoggedIn ? (
                <button className="ghost-btn" onClick={() => { setMobileOpen(false); onLogout && onLogout(); }}>Sign out</button>
              ) : (
                <button className="cta-pill" onClick={() => { setMobileOpen(false); setView('login'); }}>Login</button>
              )}
            </footer>
          </aside>
        </>
      )}
    </header>
  );
};

// Mini circular map for location selector
const MiniMap = ({ size = 58 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
    <defs>
      <clipPath id="mapClip"><circle cx="30" cy="30" r="28" /></clipPath>
    </defs>
    <circle cx="30" cy="30" r="29" fill="#E8F1FA" stroke="#07072B" strokeWidth="1.4" />
    <g clipPath="url(#mapClip)">
      {/* abstract land shapes */}
      <path d="M-4 18 Q 14 14 24 22 T 50 18 L 64 16 L 64 34 Q 50 36 38 30 T 14 38 L -4 36 Z" fill="#FBEAD3" opacity="0.95" />
      <path d="M-4 40 Q 16 36 30 44 T 64 42 L 64 64 L -4 64 Z" fill="#F4D6AE" opacity="0.85" />
      {/* roads */}
      <path d="M0 24 Q 18 22 30 30 T 60 28" stroke="#fff" strokeWidth="1.4" fill="none" />
      <path d="M10 50 Q 24 42 36 46 T 58 50" stroke="#fff" strokeWidth="1.2" fill="none" />
    </g>
    {/* center pin */}
    <g transform="translate(30 26)">
      <path d="M0 12 C -6 6 -6 0 0 -6 C 6 0 6 6 0 12 Z" fill="#F83F8F" stroke="#07072B" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2.4" fill="#fff" />
    </g>
  </svg>
);

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  const cats = [
    { id: 'all', label: 'All', Icon: IconGridSquares },
    { id: 'house', label: 'House', Icon: IconHouse },
    { id: 'hotel', label: 'Hotel', Icon: IconHotel },
    { id: 'villa', label: 'Villa', Icon: IconVilla },
    { id: 'apartment', label: 'Apartment', Icon: IconApartment },
    { id: 'camp', label: 'Camp House', Icon: IconCamp },
  ];
  const desktopCats = cats.filter(c => c.id !== 'all');
  const locations = [
    { id: 'jumeirah', name: 'Dubai City', area: 'Jumeirah' },
    { id: 'palm', name: 'Dubai City', area: 'Palm Jumeirah' },
    { id: 'marina', name: 'Dubai City', area: 'Dubai Marina' },
    { id: 'downtown', name: 'Dubai City', area: 'Downtown' },
    { id: 'abudhabi', name: 'Abu Dhabi', area: 'Saadiyat Island' },
    { id: 'maldives', name: 'Maldives', area: 'Malé Atoll' },
  ];

  const [sheet, setSheet] = React.useState(null); // null | 'cat' | 'loc'
  const [activeLoc, setActiveLoc] = React.useState('jumeirah');
  const activeCat = cats.find(c => c.id === activeCategory) || cats.find(c => c.id === 'villa');
  const activeLocObj = locations.find(l => l.id === activeLoc) || locations[0];

  React.useEffect(() => {
    if (!sheet) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setSheet(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [sheet]);

  return (
    <div className="cat-nav">
      {/* Desktop UI */}
      <button className="cat-all desktop-only" onClick={() => setActiveCategory('all')}>
        <span className="cat-all-icon"><IconGridSquares size={22} stroke={2} /></span>
        <span className="cat-all-text">ALL CATEGORY</span>
        <IconChevron size={18} stroke={2} />
      </button>

      <div className="cat-list desktop-only">
        {desktopCats.map(({ id, label, Icon: I }) => (
          <button
            key={id}
            className={`cat-item ${activeCategory === id ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(id)}
          >
            <I size={22} stroke={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button className="loc-selector desktop-only">
        <MiniMap size={44} />
        <div className="loc-text">
          <div className="loc-main">{activeLocObj.name}</div>
          <div className="loc-sub">{activeLocObj.area}</div>
        </div>
        <IconChevron size={18} stroke={2} />
      </button>

      {/* Mobile UI — two beautiful pill dropdowns */}
      <div className="cat-mobile mobile-only">
        <button className="cat-pill" onClick={() => setSheet('cat')} aria-haspopup="dialog">
          <span className="cat-pill-icon">
            <activeCat.Icon size={20} stroke={1.8} />
          </span>
          <span className="cat-pill-text">
            <small>Category</small>
            <strong>{activeCat.label === 'All' ? 'All categories' : activeCat.label}</strong>
          </span>
          <IconChevron size={16} stroke={2} />
        </button>
        <button className="cat-pill cat-pill-loc" onClick={() => setSheet('loc')} aria-haspopup="dialog">
          <span className="cat-pill-icon loc-icon">
            <IconMapPin size={20} stroke={1.8} />
          </span>
          <span className="cat-pill-text">
            <small>Where</small>
            <strong>{activeLocObj.name} · {activeLocObj.area}</strong>
          </span>
          <IconChevron size={16} stroke={2} />
        </button>
      </div>

      {/* Bottom sheets */}
      {sheet && (
        <>
          <div className="sheet-scrim" onClick={() => setSheet(null)} />
          <div className="sheet" role="dialog">
            <div className="sheet-handle" />
            <header>
              <h3>{sheet === 'cat' ? 'Pick a category' : 'Where are you headed?'}</h3>
              <button className="icon-btn" onClick={() => setSheet(null)} aria-label="Close">
                <IconClose size={20} />
              </button>
            </header>
            {sheet === 'cat' && (
              <ul className="sheet-list">
                {cats.map(c => (
                  <li key={c.id}>
                    <button
                      className={`sheet-row ${activeCategory === c.id ? 'is-on' : ''}`}
                      onClick={() => { setActiveCategory(c.id); setSheet(null); }}
                    >
                      <span className="sheet-row-icon"><c.Icon size={22} stroke={1.8} /></span>
                      <span className="sheet-row-label">
                        <strong>{c.label === 'All' ? 'All categories' : c.label}</strong>
                        <small>{
                          c.id === 'all' ? 'Browse every kind of stay'
                          : c.id === 'house' ? 'Family homes & townhouses'
                          : c.id === 'hotel' ? 'Boutique & branded hotels'
                          : c.id === 'villa' ? 'Standalone luxury homes'
                          : c.id === 'apartment' ? 'In residential buildings'
                          : 'Unique outdoor stays'
                        }</small>
                      </span>
                      {activeCategory === c.id && (
                        <span className="sheet-check"><IconCheck size={14} stroke={2.4} /></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {sheet === 'loc' && (
              <ul className="sheet-list">
                {locations.map(l => (
                  <li key={l.id}>
                    <button
                      className={`sheet-row ${activeLoc === l.id ? 'is-on' : ''}`}
                      onClick={() => { setActiveLoc(l.id); setSheet(null); }}
                    >
                      <span className="sheet-row-icon"><IconMapPin size={22} stroke={1.8} /></span>
                      <span className="sheet-row-label">
                        <strong>{l.area}</strong>
                        <small>{l.name}</small>
                      </span>
                      {activeLoc === l.id && (
                        <span className="sheet-check"><IconCheck size={14} stroke={2.4} /></span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// CSS for header — appended once
(() => {
  if (document.getElementById('header-styles')) return;
  const css = `
  .top-nav {
    background: #fff;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .top-nav-inner {
    display: flex;
    align-items: center;
    gap: 28px;
    height: 98px;
    padding: 0 52px;
    max-width: 1440px;
    margin: 0 auto;
  }
  .logo-wrap {
    display: flex; align-items: center; gap: 8px;
    transition: transform .2s ease;
  }
  .logo-wrap:hover { transform: translateY(-1px); }
  .logo-text {
    font-size: 22px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.02em;
  }
  .lang-pill {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 14px; font-weight: 600;
    color: var(--navy);
    padding: 6px 4px;
  }
  .search-bar {
    flex: 0 0 420px;
    height: 56px;
    background: var(--search-bg);
    border-radius: 16px;
    display: flex; align-items: center;
    padding: 0 20px;
    gap: 12px;
    color: var(--icon);
    transition: background .2s ease, box-shadow .2s ease;
  }
  .search-bar:focus-within {
    background: #fff;
    box-shadow: 0 0 0 2px rgba(79, 54, 232, 0.18), 0 8px 22px rgba(79, 54, 232, 0.08);
  }
  .search-bar input {
    border: none; background: transparent;
    width: 100%;
    font-size: 15px;
    font-family: inherit;
    color: var(--navy);
    outline: none;
  }
  .search-bar input::placeholder { color: var(--muted); }
  .nav-links {
    display: flex; align-items: center; gap: 28px;
    margin-left: auto;
  }
  .nav-link {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
    padding: 6px 6px;
    transition: color .15s ease;
  }
  .nav-link:hover { color: var(--navy); }
  .nav-link.is-active { color: var(--navy); font-weight: 600; }
  .nav-label { position: relative; z-index: 1; }
  .nav-highlight {
    position: absolute;
    inset: -2px -10px;
    background: var(--highlight);
    border-radius: 6px;
    transform: rotate(-4deg);
    z-index: 0;
  }
  .nav-divider {
    width: 1px; height: 24px;
    background: #D8D8E6;
    margin: 0 4px;
  }
  .currency {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; font-weight: 600; color: var(--navy);
  }
  .currency:hover { opacity: .8; }
  .login-btn {
    width: 148px; height: 58px;
    background: var(--navy);
    color: #fff;
    border-radius: 999px;
    font-size: 14px; font-weight: 700;
    letter-spacing: 0.01em;
    transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
  }
  .login-btn:hover {
    background: #14143F;
    box-shadow: 0 12px 28px rgba(6, 6, 39, 0.25);
    transform: translateY(-1px);
  }

  /* User menu */
  .user-wrap { position: relative; }
  .user-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px 6px 6px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 999px;
    height: 50px;
    color: var(--navy);
    transition: box-shadow .15s, border-color .15s;
  }
  .user-pill:hover { border-color: var(--purple); box-shadow: 0 8px 22px rgba(79,54,232,0.14); }
  .user-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    color: #fff;
    display: grid; place-items: center;
    font-weight: 800; font-size: 12px;
  }
  .user-avatar.lg { width: 48px; height: 48px; font-size: 14px; }
  .user-menu {
    position: absolute;
    right: 0; top: calc(100% + 8px);
    width: 280px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 24px 60px rgba(7, 7, 43, 0.18);
    border: 1px solid var(--border);
    padding: 8px;
    z-index: 100;
    animation: menuFade .15s ease;
  }
  @keyframes menuFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  .user-menu-head {
    display: flex; gap: 12px; align-items: center;
    padding: 12px 12px 14px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 6px;
  }
  .user-menu-head strong { display: block; font-size: 14px; }
  .user-menu-head span { display: block; font-size: 12px; color: var(--muted); }
  .user-menu button {
    display: block;
    width: 100%;
    padding: 10px 14px;
    text-align: left;
    font-size: 14px; font-weight: 500;
    color: var(--navy);
    border-radius: 10px;
    transition: background .12s;
  }
  .user-menu button:hover { background: var(--lav-bg); }
  .user-menu-div { height: 1px; background: var(--border); margin: 6px 4px; }

  /* Category nav */
  .cat-nav {
    display: flex;
    align-items: stretch;
    background: #fff;
    border-bottom: 1px solid var(--border);
    height: 72px;
    max-width: 1440px;
    margin: 0 auto;
  }
  .cat-all {
    flex: 0 0 260px;
    display: flex; align-items: center;
    gap: 12px;
    padding: 0 22px;
    color: #fff;
    background: linear-gradient(135deg, #FF5B6E 0%, #EA3FA2 55%, #D931B8 100%);
    border-top-right-radius: 26px;
    border-bottom-right-radius: 4px;
    font-weight: 700;
    letter-spacing: 0.06em;
    font-size: 14px;
    box-shadow: 0 12px 32px rgba(234, 63, 162, 0.25);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .cat-all:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 38px rgba(234, 63, 162, 0.32);
  }
  .cat-all-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,0.18);
    display: grid; place-items: center;
  }
  .cat-all-text { flex: 1; text-align: left; }

  .cat-list {
    display: flex; flex: 1;
    margin-left: -24px; /* tuck under the rounded right corner */
    padding-left: 24px;
  }
  .cat-item {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    gap: 10px;
    padding: 0 14px;
    font-size: 14px; font-weight: 500;
    color: #6F7290;
    border-right: 1px solid var(--border);
    position: relative;
    transition: background .18s ease, color .18s ease;
  }
  .cat-item:hover {
    background: var(--lav-bg);
    color: var(--navy);
  }
  .cat-item.is-active {
    background: linear-gradient(180deg, #F1EFFF 0%, #FFFFFF 100%);
    color: var(--purple);
    font-weight: 600;
  }
  .cat-item.is-active::after {
    content: '';
    position: absolute;
    left: 12px; right: 12px; bottom: 0;
    height: 3px;
    background: var(--purple);
    border-radius: 3px 3px 0 0;
    box-shadow: 0 -4px 16px rgba(79, 54, 232, 0.25);
  }

  .loc-selector {
    flex: 0 0 260px;
    display: flex; align-items: center;
    gap: 12px;
    padding: 0 22px 0 18px;
    background: #fff;
    border-left: 1px solid var(--border);
    transition: background .18s ease;
  }
  .loc-selector:hover { background: var(--lav-bg); }
  .loc-text {
    flex: 1;
    text-align: left;
    line-height: 1.2;
  }
  .loc-main { font-size: 15px; font-weight: 700; color: var(--navy); }
  .loc-sub { font-size: 12px; color: var(--muted); margin-top: 1px; }
  `;
  const s = document.createElement('style');
  s.id = 'header-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { AceLogo, TopNav, CategoryNav, MiniMap });
