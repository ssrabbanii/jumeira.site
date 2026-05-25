// Jumeira app shell — view routing, tweaks, footer

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentMode": "pink",
  "cardRadius": 22,
  "imageHeight": 218,
  "showLabels": true,
  "gridColumns": 3,
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  pink:   { coral: '#FF5B6E', magenta: '#EA3FA2', deep: '#D931B8', pink: '#F83F8F' },
  ocean:  { coral: '#3FBDFF', magenta: '#4F36E8', deep: '#2A1FA8', pink: '#4F36E8' },
  sunset: { coral: '#FFB152', magenta: '#FF5B6E', deep: '#D9358F', pink: '#FF7A4E' },
  forest: { coral: '#6BE0A8', magenta: '#1E9B5C', deep: '#0A5C3B', pink: '#1EAA6C' },
};

const Footer = ({ setView }) => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="logo-wrap">
          <AceLogo size={36} />
          <span className="logo-text">jumeira</span>
        </div>
        <p>Curated luxury homes, villas, and hotels across 62 markets. Premium guests, premium hosts.</p>
        <div className="social-row">
          {['Instagram', 'Pinterest', 'TikTok', 'LinkedIn'].map(s => (
            <a key={s} href="#" onClick={(e) => e.preventDefault()}>{s}</a>
          ))}
        </div>
      </div>
      <div className="footer-cols">
        <div>
          <h4>Discover</h4>
          <a onClick={() => setView('home')}>Homepage</a>
          <a onClick={() => setView('listing')}>Browse villas</a>
          <a onClick={() => setView('listing')}>Destinations</a>
          <a onClick={() => setView('listing')}>Gift cards</a>
        </div>
        <div>
          <h4>Hosting</h4>
          <a onClick={() => setView('host')}>Become a host</a>
          <a onClick={() => setView('host')}>Earnings calculator</a>
          <a onClick={() => setView('host')}>Host responsibly</a>
          <a onClick={() => setView('host')}>Resources</a>
        </div>
        <div>
          <h4>Jumeira</h4>
          <a>About us</a>
          <a>Press</a>
          <a>Careers</a>
          <a>Investors</a>
        </div>
        <div>
          <h4>Support</h4>
          <a>Help center</a>
          <a>Trust & safety</a>
          <a>Cancellation</a>
          <a onClick={() => setView('contact')}>Contact</a>
        </div>
      </div>
    </div>
    <div className="footer-foot">
      <span>© 2026 Jumeira, Inc.</span>
      <div className="legal">
        <a>Privacy</a><span>·</span>
        <a>Terms</a><span>·</span>
        <a>Sitemap</a>
      </div>
    </div>
  </footer>
);

const readRouteFromUrl = () => {
  const parsed = parseListingPath(window.location.pathname);
  if (parsed) return parsed;
  return { view: 'listing', categoryId: 'villa', locationId: 'jumeirah' };
};

const App = () => {
  const initialRoute = readRouteFromUrl();
  const isIntroLocked = () => {
    try {
      return (
        sessionStorage.getItem('jumeira.disclaimerSeen') !== '1' ||
        sessionStorage.getItem('jumeira.tourSeenV2') !== '1'
      );
    } catch (e) {
      return true;
    }
  };
  const [view, setView] = React.useState(initialRoute.view || 'listing');
  const [searchValue, setSearchValue] = React.useState('');
  const [listingQuery, setListingQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState(initialRoute.categoryId || 'villa');
  const [activeLocation, setActiveLocation] = React.useState(initialRoute.locationId || 'jumeirah');
  const [bookmarks, setBookmarks] = React.useState({ 1: true });
  const [activeProperty, setActiveProperty] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [accountTab, setAccountTab] = React.useState('trips');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [introLocked, setIntroLocked] = React.useState(isIntroLocked);

  const syncListingUrl = React.useCallback((categoryId, locationId) => {
    const path = buildListingPath(categoryId, locationId);
    if (window.location.pathname !== path) {
      window.history.pushState({ view: 'listing', categoryId, locationId }, '', path);
    }
  }, []);

  const browseListing = React.useCallback((categoryId, locationId, query = '') => {
    const cat = categoryId || activeCategory;
    const loc = locationId || activeLocation;
    setActiveCategory(cat);
    setActiveLocation(loc);
    setListingQuery(query || '');
    setView('listing');
    syncListingUrl(cat, loc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory, activeLocation, syncListingUrl]);

  React.useEffect(() => {
    const onPop = () => {
      const parsed = parseListingPath(window.location.pathname);
      if (!parsed) return;
      if (parsed.view) setView(parsed.view);
      if (parsed.categoryId) setActiveCategory(parsed.categoryId);
      if (parsed.locationId) setActiveLocation(parsed.locationId);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Apply tweaks via CSS variables
  React.useEffect(() => {
    const accent = ACCENT_PRESETS[t.accentMode] || ACCENT_PRESETS.pink;
    const r = document.documentElement;
    r.style.setProperty('--coral', accent.coral);
    r.style.setProperty('--magenta', accent.magenta);
    r.style.setProperty('--magenta-2', accent.deep);
    r.style.setProperty('--pink', accent.pink);
    r.style.setProperty('--card-radius', t.cardRadius + 'px');
    r.style.setProperty('--img-height', t.imageHeight + 'px');
    r.style.setProperty('--grid-cols', t.gridColumns);
    r.style.setProperty('--cat-all-grad',
      `linear-gradient(135deg, ${accent.coral} 0%, ${accent.magenta} 55%, ${accent.deep} 100%)`);
    r.style.setProperty('--card-pad', t.density === 'compact' ? '14px 18px 18px' : '18px 22px 22px');
  }, [t]);

  const openProperty = (p) => {
    setActiveProperty(p);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (view === 'listing') syncListingUrl(activeCategory, activeLocation);
  }, []);

  React.useEffect(() => {
    const checkIntroLock = () => setIntroLocked(isIntroLocked());
    checkIntroLock();
    const id = window.setInterval(checkIntroLock, 250);
    return () => window.clearInterval(id);
  }, []);

  const goView = (v) => {
    setView(v);
    const staticPaths = {
      home: '/home',
      buy: '/buy',
      rent: '/rent',
      contact: '/contact',
      login: '/login',
      host: '/host',
      account: '/account',
    };
    if (staticPaths[v]) window.history.pushState({ view: v }, '', staticPaths[v]);
    else if (v === 'listing') syncListingUrl(activeCategory, activeLocation);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goAccountTab = (tab) => {
    setAccountTab(tab);
    setView('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSelect = (item) => {
    if (item.type === 'property' && item.property) {
      setSearchValue(item.label);
      openProperty(item.property);
      return;
    }
    if (item.view) {
      setSearchValue(item.label);
      goView(item.view);
      return;
    }
    setSearchValue(item.label);
    browseListing(item.categoryId || 'all', item.locationId || 'jumeirah', item.query || '');
  };

  return (
    <div className={`app density-${t.density} ${t.showLabels ? '' : 'hide-labels'}`} data-screen-label={`Jumeira · ${view}`}>
      <div className={`app-shell ${introLocked ? 'is-locked' : ''}`} aria-hidden={introLocked}>
        <TopNav
          view={view}
          setView={goView}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchSelect={handleSearchSelect}
          isLoggedIn={isLoggedIn}
          onLogout={() => { setIsLoggedIn(false); goView('home'); }}
          onAccountTab={goAccountTab}
        />
        {(view === 'listing' || view === 'home') && (
          <CategoryNav
            activeCategory={activeCategory}
            activeLocation={activeLocation}
            onSelectCategory={(c) => browseListing(c, activeLocation)}
            onSelectLocation={(loc) => browseListing(activeCategory, loc)}
          />
        )}

        {view === 'listing' && (
          <ListingPage
            onOpenProperty={openProperty}
            activeCategory={activeCategory}
            activeLocation={activeLocation}
            listingQuery={listingQuery}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'detail' && (
          <DetailPage
            property={activeProperty || PROPERTIES[0]}
            onBack={() => goView('listing')}
            onReserve={() => goView('checkout')}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'checkout' && (
          <CheckoutPage
            property={activeProperty || PROPERTIES[0]}
            setView={goView}
            goToTrips={() => goAccountTab('trips')}
          />
        )}
        {view === 'home' && (
          <HomePage
            setView={goView}
            onBrowse={browseListing}
            onOpenProperty={openProperty}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'login' && (
          <LoginPage setView={goView} onLogin={() => { setIsLoggedIn(true); goView('home'); }} />
        )}
        {view === 'host' && <HostPage setView={goView} />}
        {view === 'host-dash' && <HostDashboard setView={goView} />}
        {view === 'list' && <ListPropertyPage setView={goView} />}
        {view === 'account' && (
          <AccountPage
            initialTab={accountTab}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            onOpenProperty={openProperty}
          />
        )}
        {view === 'buy' && (
          <BuyPage
            setView={goView}
            onBrowse={browseListing}
            onOpenProperty={openProperty}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'rent' && (
          <RentPage
            setView={goView}
            onBrowse={browseListing}
            onOpenProperty={openProperty}
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
          />
        )}
        {view === 'contact' && <ContactPage setView={goView} />}

        <Footer setView={goView} />
        <FontSwitcher />

        <TweaksPanel title="Tweaks">
          <TweakSection label="Brand accent">
            <TweakColor
              label="Palette"
              value={ACCENT_PRESETS[t.accentMode] ? [ACCENT_PRESETS[t.accentMode].coral, ACCENT_PRESETS[t.accentMode].magenta, ACCENT_PRESETS[t.accentMode].deep] : ACCENT_PRESETS.pink}
              options={[
                ['#FF5B6E', '#EA3FA2', '#D931B8'],
                ['#3FBDFF', '#4F36E8', '#2A1FA8'],
                ['#FFB152', '#FF5B6E', '#D9358F'],
                ['#6BE0A8', '#1E9B5C', '#0A5C3B'],
              ]}
              onChange={(v) => {
                const i = ['#FF5B6E', '#3FBDFF', '#FFB152', '#6BE0A8'].indexOf(v[0]);
                setTweak('accentMode', ['pink','ocean','sunset','forest'][i] || 'pink');
              }}
            />
          </TweakSection>
          <TweakSection label="Cards">
            <TweakSlider label="Card radius" value={t.cardRadius} min={6} max={36} step={2} unit="px" onChange={(v) => setTweak('cardRadius', v)} />
            <TweakSlider label="Image height" value={t.imageHeight} min={160} max={300} step={4} unit="px" onChange={(v) => setTweak('imageHeight', v)} />
            <TweakRadio label="Density" value={t.density} options={['compact','comfortable']} onChange={(v) => setTweak('density', v)} />
            <TweakToggle label="Show 'VILLA' label" value={t.showLabels} onChange={(v) => setTweak('showLabels', v)} />
          </TweakSection>
          <TweakSection label="Jump to">
            <TweakButton label="Homepage" onClick={() => goView('home')} />
            <TweakButton label="Listing / search" onClick={() => goView('listing')} />
            <TweakButton label="Property detail" onClick={() => goView('detail')} />
            <TweakButton label="Checkout" onClick={() => goView('checkout')} />
            <TweakButton label="My account" onClick={() => goAccountTab('trips')} />
            <TweakButton label="Inbox" onClick={() => goAccountTab('inbox')} />
            <TweakButton label="Saved homes" onClick={() => goAccountTab('saved')} />
            <TweakButton label="Login" onClick={() => goView('login')} />
            <TweakButton label="Host landing" onClick={() => goView('host')} />
            <TweakButton label="Host dashboard" onClick={() => goView('host-dash')} />
            <TweakButton label="List a property" onClick={() => goView('list')} />
          </TweakSection>
        </TweaksPanel>
      </div>

      <DisclaimerModal />
      <TourModal onComplete={() => setIntroLocked(false)} />
    </div>
  );
};

// Global styles for app shell + tweak-driven overrides
(() => {
  if (document.getElementById('app-styles')) return;
  const css = `
  .prop-card { border-radius: var(--card-radius, 22px); }
  .prop-img-wrap { height: var(--img-height, 218px); }
  .prop-grid:not(.is-list) { grid-template-columns: repeat(var(--grid-cols, 3), 1fr) !important; }
  .prop-body { padding: var(--card-pad, 18px 22px 22px); }
  .cat-all { background: var(--cat-all-grad, linear-gradient(135deg, #FF5B6E 0%, #EA3FA2 55%, #D931B8 100%)) !important; }

  .density-compact .prop-row { margin-top: 12px; }
  .density-compact .prop-title { margin: 6px 0 4px; }

  .app .prop-label[data-hide] { display: none; }
  .app.hide-labels .prop-label { display: none; }
  .app.hide-labels .prop-title { margin-top: 0; }
  .app-shell.is-locked { display: none; }

  .placeholder-page { max-width: 1440px; margin: 0 auto; padding: 80px 52px; min-height: 50vh; }
  .placeholder-card {
    background: #fff;
    border-radius: 24px;
    padding: 60px;
    box-shadow: var(--shadow-card);
    text-align: center;
    max-width: 560px;
    margin: 0 auto;
  }
  .placeholder-card h1 { font-size: 38px; font-weight: 800; margin: 0 0 12px; letter-spacing: -0.02em; }
  .placeholder-card p { color: var(--muted); font-size: 16px; }

  /* Footer */
  .footer { background: #fff; border-top: 1px solid var(--border); margin-top: 60px; }
  .footer-inner {
    max-width: 1440px; margin: 0 auto;
    padding: 60px 52px 36px;
    display: grid; grid-template-columns: 1.2fr 2fr; gap: 60px;
  }
  .footer-brand p { color: var(--muted); font-size: 14px; line-height: 1.55; max-width: 320px; margin: 16px 0 18px; text-wrap: pretty; }
  .social-row { display: flex; gap: 14px; }
  .social-row a {
    font-size: 13px; font-weight: 600;
    color: var(--navy);
    padding: 8px 14px;
    background: var(--lav-bg);
    border-radius: 999px;
    transition: background .15s, color .15s;
    cursor: pointer;
  }
  .social-row a:hover { background: var(--navy); color: #fff; }
  .footer-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .footer-cols h4 { font-size: 14px; font-weight: 800; margin: 0 0 14px; color: var(--navy); }
  .footer-cols a {
    display: block;
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 10px;
    cursor: pointer;
    transition: color .15s;
  }
  .footer-cols a:hover { color: var(--navy); }
  .footer-foot {
    max-width: 1440px; margin: 0 auto;
    padding: 20px 52px 36px;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--border);
    color: var(--muted); font-size: 13px;
  }
  .legal { display: flex; gap: 10px; }
  .legal a { cursor: pointer; transition: color .15s; }
  .legal a:hover { color: var(--navy); }
  .legal span { color: #D8D8E6; }
  `;
  const s = document.createElement('style');
  s.id = 'app-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
