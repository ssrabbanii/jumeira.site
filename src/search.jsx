// Search index, autocomplete, hero search form

const POPULAR_SEARCHES = [
  { label: 'Beachfront villas in Jumeirah', locationId: 'jumeirah', categoryId: 'villa' },
  { label: 'Palm Jumeirah luxury stays', locationId: 'palm', categoryId: 'all' },
  { label: 'Dubai Marina apartments', locationId: 'marina', categoryId: 'apartment' },
  { label: 'Downtown hotel suites', locationId: 'downtown', categoryId: 'hotel' },
  { label: 'Maldives camp houses', locationId: 'maldives', categoryId: 'camp' },
  { label: 'Family houses with pool', locationId: 'jumeirah', categoryId: 'house' },
];

const buildSearchIndex = () => {
  const items = [];

  LOCATIONS.forEach((l) => {
    items.push({
      type: 'location',
      label: `${l.area}, ${l.city}`,
      sub: 'Destination',
      locationId: l.id,
      categoryId: 'all',
      keywords: `${l.area} ${l.city} ${l.id} dubai`.toLowerCase(),
    });
  });

  CATEGORIES.forEach((c) => {
    items.push({
      type: 'category',
      label: c.id === 'all' ? 'All categories' : c.label,
      sub: 'Property type',
      locationId: 'jumeirah',
      categoryId: c.id,
      keywords: `${c.label} ${c.subtitle || ''} ${c.id}`.toLowerCase(),
    });
  });

  (HOME_DESTINATIONS || []).forEach((d) => {
    const locId = DEST_TO_LOC[d.name] || 'jumeirah';
    items.push({
      type: 'destination',
      label: d.name,
      sub: d.desc || d.count,
      locationId: locId,
      categoryId: 'all',
      keywords: `${d.name} ${d.desc || ''}`.toLowerCase(),
    });
  });

  POPULAR_SEARCHES.forEach((p, i) => {
    items.push({
      type: 'popular',
      label: p.label,
      sub: 'Popular search',
      locationId: p.locationId,
      categoryId: p.categoryId,
      keywords: p.label.toLowerCase(),
      id: `pop-${i}`,
    });
  });

  (PROPERTIES || []).forEach((p) => {
    const loc = getLocation(p.locationId);
    items.push({
      type: 'property',
      label: p.title,
      sub: `${loc.area} · ${p.label} · From ${p.priceFrom} USD`,
      locationId: p.locationId,
      categoryId: p.category,
      property: p,
      keywords: `${p.title} ${p.excerpt || ''} ${p.meta} ${loc.area} ${loc.city} ${p.category}`.toLowerCase(),
      id: `prop-${p.id}`,
    });
  });

  items.push(
    { type: 'page', label: 'Buy a home', sub: 'Properties for sale', view: 'buy', keywords: 'buy purchase sale own home' },
    { type: 'page', label: 'Rent a stay', sub: 'Nightly, monthly & yearly', view: 'rent', keywords: 'rent rental lease stay book' },
    { type: 'page', label: 'Contact us', sub: 'Support & concierge', view: 'contact', keywords: 'contact help support email phone' },
    { type: 'page', label: 'Become a host', sub: 'List your property', view: 'host', keywords: 'host list property sell' },
  );

  return items;
};

let SEARCH_INDEX = [];

const refreshSearchIndex = () => {
  SEARCH_INDEX = buildSearchIndex();
};

refreshSearchIndex();

const searchSuggestions = (query, limit = 8) => {
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    return [
      ...POPULAR_SEARCHES.slice(0, 4).map((p, i) => ({
        type: 'popular',
        label: p.label,
        sub: 'Popular search',
        locationId: p.locationId,
        categoryId: p.categoryId,
        id: `pop-default-${i}`,
      })),
      ...LOCATIONS.slice(0, 4).map((l) => ({
        type: 'location',
        label: `${l.area}, ${l.city}`,
        sub: 'Destination',
        locationId: l.id,
        categoryId: 'all',
      })),
    ].slice(0, limit);
  }

  const scored = SEARCH_INDEX.map((item) => {
    const label = item.label.toLowerCase();
    const kw = item.keywords || label;
    let score = 0;
    if (label.startsWith(q)) score += 100;
    else if (label.includes(q)) score += 60;
    if (kw.includes(q)) score += 30;
    const words = q.split(/\s+/).filter(Boolean);
    words.forEach((w) => { if (kw.includes(w)) score += 12; });
    return { item, score };
  }).filter((x) => x.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.item);
};

const SearchBar = ({ value, onChange, onSelect, placeholder, variant = 'nav' }) => {
  const [open, setOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const wrapRef = React.useRef(null);
  const listRef = React.useRef(null);

  const suggestions = React.useMemo(() => searchSuggestions(value, 8), [value]);
  const showList = open && suggestions.length > 0;

  const pick = (item) => {
    onChange(item.label);
    setOpen(false);
    onSelect && onSelect(item);
  };

  React.useEffect(() => {
    setActiveIdx(0);
  }, [value, suggestions.length]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const onKeyDown = (e) => {
    if (!showList) {
      if (e.key === 'ArrowDown' && suggestions.length) { setOpen(true); e.preventDefault(); }
      if (e.key === 'Enter' && value.trim()) {
        e.preventDefault();
        pick(suggestions[0] || { type: 'query', label: value, locationId: 'jumeirah', categoryId: 'all', query: value.trim() });
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(suggestions[activeIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.children[activeIdx];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const typeIcon = (type) => {
    if (type === 'location' || type === 'destination') return IconMapPin;
    if (type === 'category') return IconVilla;
    if (type === 'property') return IconHouse;
    if (type === 'page') return IconArrowRight;
    return IconSearch;
  };

  return (
    <div className={`search-wrap search-wrap--${variant}`} ref={wrapRef}>
      <div className={`search-bar search-bar--${variant}`}>
        <IconSearch size={20} stroke={1.8} />
        <input
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
      </div>
      {showList && (
        <ul className="search-suggest" ref={listRef} role="listbox">
          {suggestions.map((item, i) => {
            const I = typeIcon(item.type);
            return (
              <li key={item.id || `${item.type}-${item.label}-${i}`} role="option" aria-selected={i === activeIdx}>
                <button
                  type="button"
                  className={`search-suggest-row ${i === activeIdx ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => pick(item)}
                >
                  <span className="search-suggest-icon"><I size={18} stroke={1.8} /></span>
                  <span className="search-suggest-text">
                    <strong>{item.label}</strong>
                    <small>{item.sub}</small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const formatDateRange = (start, end) => {
  if (!start) return 'Select dates';
  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (!end) return fmt(start);
  return `${fmt(start)} — ${fmt(end)}`;
};

const HeroSearch = ({ onSearch, onMarqueeClick }) => {
  const [locationId, setLocationId] = React.useState('jumeirah');
  const [categoryId, setCategoryId] = React.useState('villa');
  const [guests, setGuests] = React.useState(4);
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [openPanel, setOpenPanel] = React.useState(null);

  const loc = getLocation(locationId);
  const cat = getCategory(categoryId);
  const CatIcon = cat.Icon || IconVilla;

  const today = new Date().toISOString().slice(0, 10);
  const panelTitles = {
    loc: 'Choose location',
    cat: 'Choose property type',
    dates: 'Select dates',
    guests: 'Select guests',
  };
  const closePanel = () => setOpenPanel(null);

  const submit = () => {
    closePanel();
    onSearch({ locationId, categoryId, guests, checkIn, checkOut });
  };

  React.useEffect(() => {
    if (!openPanel) return undefined;
    const onDoc = (e) => {
      if (!e.target.closest('.hs-field') && !e.target.closest('.hs-panel') && !e.target.closest('.hs-mobile-sheet')) closePanel();
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [openPanel]);

  React.useEffect(() => {
    if (!openPanel || !window.matchMedia('(max-width: 760px)').matches) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openPanel]);

  const renderLocationPanel = () => (
    <>
      {LOCATIONS.map((l) => (
        <button
          key={l.id}
          type="button"
          className={locationId === l.id ? 'is-on' : ''}
          onClick={() => { setLocationId(l.id); closePanel(); }}
        >
          <span className="hs-panel-icon"><IconMapPin size={18} stroke={1.8} /></span>
          <span>
            <strong>{l.area}</strong>
            <small>{l.city}</small>
          </span>
        </button>
      ))}
    </>
  );

  const renderCategoryPanel = () => (
    <>
      {CATEGORIES.map((c) => {
        const I = c.Icon;
        return (
          <button
            key={c.id}
            type="button"
            className={categoryId === c.id ? 'is-on' : ''}
            onClick={() => { setCategoryId(c.id); closePanel(); }}
          >
            <span className="hs-panel-icon"><I size={18} stroke={1.8} /></span>
            <span>
              <strong>{c.id === 'all' ? 'All types' : c.label}</strong>
              <small>{c.subtitle}</small>
            </span>
          </button>
        );
      })}
    </>
  );

  const renderDatesPanel = () => (
    <div className="hs-panel-dates">
      <label>
        <span>Check-in</span>
        <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </label>
      <label>
        <span>Check-out</span>
        <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </label>
      <button type="button" className="hs-panel-done" onClick={closePanel}>Done</button>
    </div>
  );

  const renderGuestsPanel = () => (
    <div className="hs-panel hs-panel-guests">
      <div className="guest-stepper">
        <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} aria-label="Fewer guests">−</button>
        <strong>{guests}</strong>
        <button type="button" onClick={() => setGuests((g) => Math.min(16, g + 1))} aria-label="More guests">+</button>
      </div>
      <button type="button" className="hs-panel-done" onClick={closePanel}>Done</button>
    </div>
  );

  const renderPanelContent = (panel) => {
    if (panel === 'loc') return renderLocationPanel();
    if (panel === 'cat') return renderCategoryPanel();
    if (panel === 'dates') return renderDatesPanel();
    if (panel === 'guests') return renderGuestsPanel();
    return null;
  };

  return (
    <div className="hero-search-form">
      <div className="hero-search">
        <div className={`hs-field ${openPanel === 'loc' ? 'is-open' : ''}`}>
          <span>Location</span>
          <button type="button" className="hs-val" onClick={() => setOpenPanel(openPanel === 'loc' ? null : 'loc')}>
            <span className="hs-val-icon"><IconMapPin size={16} stroke={1.8} /></span>
            <span className="hs-val-copy">{loc.area}, {loc.city}</span>
          </button>
          {openPanel === 'loc' && (
            <div className="hs-panel desktop-only">{renderLocationPanel()}</div>
          )}
        </div>

        <div className={`hs-field ${openPanel === 'cat' ? 'is-open' : ''}`}>
          <span>Property</span>
          <button type="button" className="hs-val" onClick={() => setOpenPanel(openPanel === 'cat' ? null : 'cat')}>
            <span className="hs-val-icon"><CatIcon size={16} stroke={1.8} /></span>
            <span className="hs-val-copy">{cat.id === 'all' ? 'All types' : cat.label}</span>
          </button>
          {openPanel === 'cat' && (
            <div className="hs-panel desktop-only">{renderCategoryPanel()}</div>
          )}
        </div>

        <div className={`hs-field hs-field-dates ${openPanel === 'dates' ? 'is-open' : ''}`}>
          <span>Dates</span>
          <button type="button" className="hs-val" onClick={() => setOpenPanel(openPanel === 'dates' ? null : 'dates')}>
            <span className="hs-val-icon"><IconCalendar size={16} stroke={1.8} /></span>
            <span className="hs-val-copy">{checkIn ? formatDateRange(new Date(checkIn), checkOut ? new Date(checkOut) : null) : 'Add dates'}</span>
          </button>
          {openPanel === 'dates' && <div className="hs-panel desktop-only">{renderDatesPanel()}</div>}
        </div>

        <div className={`hs-field ${openPanel === 'guests' ? 'is-open' : ''}`}>
          <span>Guests</span>
          <button type="button" className="hs-val" onClick={() => setOpenPanel(openPanel === 'guests' ? null : 'guests')}>
            <span className="hs-val-icon"><IconUsers size={16} stroke={1.8} /></span>
            <span className="hs-val-copy">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </button>
          {openPanel === 'guests' && <div className="desktop-only">{renderGuestsPanel()}</div>}
        </div>

        <button type="button" className="hs-cta" onClick={submit}>
          <IconSearch size={20} stroke={2} /> Search
        </button>
      </div>

      {openPanel && (
        <>
          <button type="button" className="hs-mobile-scrim mobile-only" aria-label="Close options" onClick={closePanel} />
          <div className="hs-mobile-sheet mobile-only" role="dialog" aria-modal="true" aria-label={panelTitles[openPanel]}>
            <div className="hs-mobile-handle" />
            <div className="hs-mobile-head">
              <h3>{panelTitles[openPanel]}</h3>
              <button type="button" className="icon-btn" onClick={closePanel} aria-label="Close">
                <IconClose size={20} />
              </button>
            </div>
            <div className="hs-mobile-body">{renderPanelContent(openPanel)}</div>
          </div>
        </>
      )}

      <div className="hero-marquee">
        <span className="muted">Popular searches —</span>
        {POPULAR_SEARCHES.map((t) => (
          <button key={t.label} type="button" className="marquee-chip" onClick={() => onMarqueeClick && onMarqueeClick(t)}>
            {t.label.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
};

const SuccessModal = ({ open, title, message, onClose }) => {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="success-scrim" onClick={onClose} role="dialog" aria-modal="true">
      <div className="success-card" onClick={(e) => e.stopPropagation()}>
        <span className="success-icon"><IconCheck size={32} stroke={2.2} /></span>
        <h2>{title}</h2>
        <p>{message}</p>
        <button type="button" className="cta-pill" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
};

(() => {
  if (document.getElementById('search-styles')) return;
  const css = `
  .search-wrap { position: relative; flex: 0 1 420px; min-width: 0; }
  .search-wrap--mobile { flex: 1; width: 100%; }
  .search-bar {
    height: 56px;
    background: var(--search-bg);
    border-radius: 16px;
    display: flex; align-items: center;
    padding: 0 20px;
    gap: 12px;
    color: var(--icon);
    transition: background .2s, box-shadow .2s;
  }
  .search-bar:focus-within {
    background: #fff;
    box-shadow: 0 0 0 2px rgba(79, 54, 232, 0.18), 0 8px 22px rgba(79, 54, 232, 0.08);
  }
  .search-bar input {
    border: none; background: transparent;
    width: 100%; min-width: 0;
    font-size: 15px;
    font-family: inherit;
    color: var(--navy);
    outline: none;
  }
  .search-bar input::placeholder { color: var(--muted); }
  .search-suggest {
    position: absolute;
    left: 0; right: 0;
    top: calc(100% + 8px);
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 24px 60px rgba(7, 7, 43, 0.16);
    padding: 8px;
    z-index: 120;
    max-height: 360px;
    overflow-y: auto;
    list-style: none;
    margin: 0;
    animation: menuFade .15s ease;
  }
  .search-suggest-row {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 10px 12px;
    border-radius: 12px;
    text-align: left;
    transition: background .12s;
  }
  .search-suggest-row:hover, .search-suggest-row.is-active { background: var(--lav-bg); }
  .search-suggest-icon {
    width: 38px; height: 38px; flex-shrink: 0;
    border-radius: 10px;
    background: var(--lav-soft);
    color: var(--purple);
    display: grid; place-items: center;
  }
  .search-suggest-text { min-width: 0; }
  .search-suggest-text strong {
    display: block; font-size: 14px; font-weight: 700; color: var(--navy);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .search-suggest-text small {
    display: block; font-size: 12px; color: var(--muted);
    margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .mobile-search-overlay .search-wrap { flex: 1; }
  .mobile-search-overlay .search-bar {
    flex: 1; height: auto; background: transparent; box-shadow: none; padding: 0;
  }

  .hero-search-form .hero-marquee { margin-top: 18px; }

  .hs-field {
    position: relative;
    padding: 10px 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    transition: background .15s, border-color .15s, box-shadow .15s;
  }
  .hs-field:hover { background: var(--lav-bg); }
  .hs-field.is-open {
    background: #fff;
    border-color: rgba(79, 54, 232, 0.18);
    box-shadow: 0 12px 30px rgba(79, 54, 232, 0.08);
  }
  .hs-field button.hs-val {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 15px; font-weight: 600; color: var(--navy);
    margin-top: 4px; text-align: left; width: 100%;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .hs-val-icon {
    width: 28px; height: 28px;
    border-radius: 9px;
    flex: 0 0 auto;
    display: grid; place-items: center;
    background: var(--lav-bg);
    color: var(--purple);
  }
  .hs-val-copy {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hs-panel {
    position: absolute;
    left: 0; right: 0;
    top: calc(100% + 6px);
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 20px 50px rgba(7, 7, 43, 0.14);
    padding: 8px;
    z-index: 30;
    max-height: 280px;
    overflow-y: auto;
  }
  .hs-panel button {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 10px 12px;
    border-radius: 10px;
    text-align: left;
    transition: background .12s;
  }
  .hs-panel button:hover { background: var(--lav-bg); }
  .hs-panel button.is-on { background: var(--lav-soft); }
  .hs-panel button strong { display: block; font-size: 14px; color: var(--navy); }
  .hs-panel button small { display: block; font-size: 12px; color: var(--muted); margin-top: 2px; }
  .hs-panel-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 10px;
    background: var(--lav-bg);
    color: var(--purple);
    display: grid; place-items: center;
  }
  .hs-panel-dates { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
  .hs-panel-dates label span { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .hs-panel-dates input {
    width: 100%; height: 44px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0 12px;
    font-family: inherit; font-size: 14px;
  }
  .hs-panel-done {
    justify-content: center;
    font-weight: 700; color: var(--purple);
    margin-top: 4px;
  }
  .guest-stepper {
    display: flex; align-items: center; justify-content: center; gap: 20px;
    padding: 12px 0;
  }
  .guest-stepper button {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--lav-bg);
    font-size: 22px; font-weight: 600;
    justify-content: center;
  }
  .guest-stepper strong { font-size: 22px; min-width: 32px; text-align: center; }
  .hs-mobile-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.42);
    backdrop-filter: blur(4px);
    z-index: 140;
    animation: fadeIn .18s ease;
  }
  .hs-mobile-sheet {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 141;
    background: #fff;
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -20px 50px rgba(7, 7, 43, 0.22);
    max-height: min(78vh, 640px);
    display: flex;
    flex-direction: column;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    animation: sheetUp .24s cubic-bezier(.22,.61,.36,1);
  }
  .hs-mobile-handle {
    width: 44px; height: 4px;
    border-radius: 999px;
    background: #D8D8E6;
    margin: 10px auto 0;
    flex: 0 0 auto;
  }
  .hs-mobile-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 18px 12px;
    border-bottom: 1px solid var(--border);
    flex: 0 0 auto;
  }
  .hs-mobile-head h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: -0.02em;
  }
  .hs-mobile-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px 16px 18px;
  }
  .hs-mobile-body .hs-panel {
    position: static;
    border: none;
    box-shadow: none;
    max-height: none;
    padding: 0;
  }
  .hs-mobile-body .hs-panel button {
    padding: 14px 12px;
    border-radius: 14px;
  }
  .hs-mobile-body .hs-panel-dates {
    padding: 0;
    gap: 14px;
  }
  .hs-mobile-body .hs-panel-dates input {
    height: 48px;
    font-size: 16px;
  }
  .hs-mobile-body .guest-stepper {
    padding: 18px 0 10px;
  }
  .hs-mobile-body .hs-panel-done {
    min-height: 48px;
    border-radius: 12px;
    background: var(--lav-bg);
    margin-top: 10px;
  }

  .success-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.45);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: grid; place-items: center;
    padding: 24px;
    animation: fadeIn .2s ease;
  }
  .success-card {
    background: #fff;
    border-radius: 24px;
    padding: 40px 36px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 30px 80px rgba(7, 7, 43, 0.2);
    animation: sheetUp .28s cubic-bezier(.22,.61,.36,1);
  }
  .success-icon {
    width: 72px; height: 72px;
    margin: 0 auto 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #E8FFF0, #C8F5D8);
    color: #1E9B5C;
    display: grid; place-items: center;
  }
  .success-card h2 { font-size: 24px; font-weight: 800; margin: 0 0 10px; color: var(--navy); }
  .success-card p { font-size: 15px; line-height: 1.55; color: var(--muted); margin: 0 0 24px; }
  `;
  const s = document.createElement('style');
  s.id = 'search-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, {
  POPULAR_SEARCHES,
  searchSuggestions,
  SearchBar,
  HeroSearch,
  SuccessModal,
  refreshSearchIndex,
});
