// Jumeira listing page — results header + property card grid
// PROPERTIES, PHOTOS loaded from mock-data.jsx

const Stars = ({ rating, size = 17 }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="stars">
      {Array.from({length: full}).map((_, i) => <IconStar key={'f' + i} size={size} filled />)}
      {half && <IconStarHalf size={size} />}
      {Array.from({length: empty}).map((_, i) => <IconStar key={'e' + i} size={size} filled={false} />)}
    </div>
  );
};

const PropertyCard = ({ property, onOpen, bookmarked, onBookmarkToggle, viewMode }) => {
  const isList = viewMode === 'list';
  return (
    <article
      className={`prop-card ${isList ? 'is-list' : ''}`}
      onClick={() => onOpen(property)}
      role="button"
      tabIndex={0}
    >
      <div className="prop-img-wrap">
        <img src={property.img} alt={property.title} loading="lazy" onError={onImgError} />
        {property.badge && <span className="prop-badge">{property.badge}</span>}
        <button
          className={`bookmark-btn ${bookmarked ? 'is-active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onBookmarkToggle(property.id); }}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <IconBookmark size={20} filled={bookmarked} />
        </button>
      </div>
      <div className="prop-body">
        <div className="prop-label-row">
          <span className="prop-label">{property.label}</span>
          {property.reviews && <span className="prop-reviews">{property.reviews} reviews</span>}
        </div>
        <h3 className="prop-title">{property.title}</h3>
        <div className="prop-meta">{property.meta}</div>
        {property.excerpt && <p className="prop-excerpt">{property.excerpt}</p>}
        {property.amenities && (
          <div className="prop-amenities">
            {property.amenities.map((a) => <span key={a} className="prop-amenity">{a}</span>)}
          </div>
        )}
        <div className="prop-row">
          <div className="prop-price">
            <span className="from">From</span>
            <strong>{property.priceFrom}</strong>
            <span className="currency">USD</span>
          </div>
          <div className="prop-rating">
            <Stars rating={property.rating} size={17} />
            <span className="rating-num">{property.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const ListingIntro = ({ activeCategory, activeLocation, count }) => {
  const loc = getLocation(activeLocation);
  const guide = LOCATION_GUIDES[activeLocation] || LOCATION_GUIDES.jumeirah;
  const catBlurbs = CATEGORY_BLURBS[activeCategory] || CATEGORY_BLURBS.all;
  return (
    <section className="listing-intro">
      <div className="listing-intro-text">
        <p className="intro-eyebrow">{loc.city} · {loc.area}</p>
        <h2 className="intro-headline">{guide.headline}</h2>
        <p className="intro-body">{guide.body}</p>
        <p className="intro-cat-blurb">{catBlurbs}</p>
        <div className="intro-highlights">
          {guide.highlights.map((h) => (
            <span key={h} className="intro-chip"><IconCheck size={14} stroke={2.2} /> {h}</span>
          ))}
        </div>
        <p className="intro-count muted">Showing <strong>{count}</strong> curated stays in this search</p>
      </div>
      <div className="listing-intro-gallery">
        {guide.gallery.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" onError={onImgError} className={`intro-img intro-img-${i + 1}`} />
        ))}
      </div>
    </section>
  );
};

const ListingFaq = () => (
  <section className="listing-faq">
    <h2>Good to know before you book</h2>
    <div className="faq-grid">
      {LISTING_FAQ.map((item) => (
        <article key={item.q} className="faq-card">
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </article>
      ))}
    </div>
  </section>
);

const ResultsHeader = ({ viewMode, setViewMode, openFilters, title, subtitle }) => (
  <div className="results-header">
    <div className="results-head-text">
      <h1 className="results-title"><span className="dash">—</span> {title}</h1>
      <p className="results-sub">{subtitle}</p>
    </div>
    <div className="results-controls">
      <button
        className={`view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
        onClick={() => setViewMode('grid')}
        aria-label="Grid view"
      >
        <IconGridSquares size={22} stroke={2} />
      </button>
      <button
        className={`view-btn ${viewMode === 'list' ? 'is-active' : ''}`}
        onClick={() => setViewMode('list')}
        aria-label="List view"
      >
        <IconListRows size={22} stroke={2} />
      </button>
      <button className="filters-btn" onClick={openFilters}>
        <IconFilter size={20} stroke={1.8} />
        <span>Filters</span>
        <IconChevron size={18} stroke={2} />
      </button>
    </div>
  </div>
);

const FilterDrawer = ({ open, onClose, filters, setFilters }) => {
  if (!open) return null;
  const toggle = (key, val) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val],
    }));
  };
  const amenities = ['Private pool', 'Jacuzzi', 'Beach access', 'Wi-Fi', 'Air conditioning', 'Kitchen', 'Free parking', 'Balcony', 'Garden', 'Security'];
  const types = ['Villa', 'House', 'Hotel', 'Apartment', 'Camp House'];
  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="filter-drawer" role="dialog" aria-label="Filters">
        <div className="drawer-head">
          <h2>Filters</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close filters"><IconClose size={22} /></button>
        </div>
        <div className="drawer-body">
          <section>
            <h3>Price range (USD / night)</h3>
            <div className="price-range">
              <input type="number" placeholder="Min" defaultValue={400} />
              <span>—</span>
              <input type="number" placeholder="Max" defaultValue={2800} />
            </div>
          </section>
          <section>
            <h3>Property type</h3>
            <div className="chip-row">
              {types.map(t => (
                <button
                  key={t}
                  className={`chip ${filters.types.includes(t) ? 'is-on' : ''}`}
                  onClick={() => toggle('types', t)}
                >{t}</button>
              ))}
            </div>
          </section>
          <section>
            <h3>Bedrooms</h3>
            <div className="num-row">
              {['Any', '1', '2', '3', '4', '5+'].map(b => (
                <button
                  key={b}
                  className={`num-btn ${filters.bedrooms === b ? 'is-on' : ''}`}
                  onClick={() => setFilters(p => ({ ...p, bedrooms: b }))}
                >{b}</button>
              ))}
            </div>
          </section>
          <section>
            <h3>Guests</h3>
            <div className="num-row">
              {['Any', '2', '4', '6', '8', '10+'].map(g => (
                <button
                  key={g}
                  className={`num-btn ${filters.guests === g ? 'is-on' : ''}`}
                  onClick={() => setFilters(p => ({ ...p, guests: g }))}
                >{g}</button>
              ))}
            </div>
          </section>
          <section>
            <h3>Amenities</h3>
            <div className="chip-row">
              {amenities.map(a => (
                <button
                  key={a}
                  className={`chip ${filters.amenities.includes(a) ? 'is-on' : ''}`}
                  onClick={() => toggle('amenities', a)}
                >{a}</button>
              ))}
            </div>
          </section>
          <section>
            <h3>Other</h3>
            <label className="switch-row">
              <span>Instant booking</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="switch-row">
              <span>Beachfront</span>
              <input type="checkbox" />
            </label>
            <label className="switch-row">
              <span>Pet friendly</span>
              <input type="checkbox" />
            </label>
          </section>
        </div>
        <div className="drawer-foot">
          <button className="link-btn" onClick={() => setFilters({ types: [], bedrooms: 'Any', guests: 'Any', amenities: [] })}>Clear all</button>
          <button className="cta-pill" onClick={onClose}>Show {Math.max(120, 649 - filters.types.length * 80 - filters.amenities.length * 30)} stays</button>
        </div>
      </aside>
    </>
  );
};

const ListingPage = ({ onOpenProperty, activeCategory, activeLocation, bookmarks, setBookmarks }) => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const cat = getCategory(activeCategory);
  const defaultType = cat.id === 'all' ? 'Villa' : cat.label;
  const [filters, setFilters] = React.useState({ types: [defaultType], bedrooms: 'Any', guests: 'Any', amenities: [] });

  React.useEffect(() => {
    const t = activeCategory === 'all' ? [] : [getCategory(activeCategory).label];
    setFilters((prev) => ({ ...prev, types: t.length ? t : ['Villa', 'House', 'Hotel', 'Apartment', 'Camp House'] }));
  }, [activeCategory, activeLocation]);

  const filtered = filterProperties(PROPERTIES, activeCategory, activeLocation);
  const title = getListingTitle(activeCategory, activeLocation);
  const subtitle = getListingSubtitle(activeCategory, activeLocation, filtered.length);

  const toggleBookmark = (id) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="listing">
      <ResultsHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        openFilters={() => setFilterOpen(true)}
        title={title}
        subtitle={subtitle}
      />
      <ListingIntro
        activeCategory={activeCategory}
        activeLocation={activeLocation}
        count={filtered.length}
      />
      <section className={`prop-grid ${viewMode === 'list' ? 'is-list' : ''}`}>
        {filtered.length === 0 ? (
          <div className="listing-empty">
            <p>No stays match this category and location yet.</p>
            <p className="muted">Try another area or browse all categories.</p>
          </div>
        ) : filtered.map(p => (
          <PropertyCard
            key={p.id}
            property={p}
            onOpen={onOpenProperty}
            bookmarked={!!bookmarks[p.id]}
            onBookmarkToggle={toggleBookmark}
            viewMode={viewMode}
          />
        ))}
      </section>
      {filtered.length > 0 && <div className="pagination">
        <button className="pg-btn" disabled>‹</button>
        <button className="pg-btn is-active">1</button>
        <button className="pg-btn">2</button>
        <button className="pg-btn">3</button>
        <span className="pg-dots">…</span>
        <button className="pg-btn">37</button>
        <button className="pg-btn">›</button>
      </div>}
      <ListingFaq />
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </main>
  );
};

(() => {
  if (document.getElementById('listing-styles')) return;
  const css = `
  .listing {
    max-width: 1440px;
    margin: 0 auto;
    padding: 36px 52px 80px;
  }
  .results-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding-top: 4px;
  }
  .results-title {
    font-size: 32px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--navy);
    margin: 0;
  }
  .results-title .dash {
    color: var(--navy);
    font-weight: 800;
    margin-right: 4px;
  }
  .results-sub {
    color: var(--muted);
    font-size: 15px;
    margin: 8px 0 0;
  }
  .listing-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
    background: var(--lav-bg);
    border-radius: 24px;
  }
  .listing-empty p { margin: 0 0 8px; font-size: 18px; font-weight: 700; color: var(--navy); }
  .listing-empty .muted { font-size: 15px; font-weight: 500; color: var(--muted); }

  .listing-intro {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 36px;
    margin-top: 28px;
    padding: 32px;
    background: linear-gradient(135deg, var(--lav-bg) 0%, #fff 55%);
    border-radius: 24px;
    border: 1px solid var(--border);
  }
  .intro-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--purple);
    margin: 0 0 10px;
  }
  .intro-headline {
    font-size: 26px; font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    color: var(--navy);
    text-wrap: balance;
  }
  .intro-body, .intro-cat-blurb {
    font-size: 15px;
    line-height: 1.65;
    color: var(--muted);
    margin: 0 0 14px;
    text-wrap: pretty;
  }
  .intro-cat-blurb {
    padding: 14px 16px;
    background: #fff;
    border-radius: 14px;
    border: 1px solid var(--border);
    color: var(--navy);
    font-weight: 500;
  }
  .intro-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0 18px;
  }
  .intro-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: #fff;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    border: 1px solid var(--border);
  }
  .intro-chip svg { color: var(--purple); flex-shrink: 0; }
  .intro-count { font-size: 14px; margin: 0; }
  .intro-count strong { color: var(--navy); }
  .listing-intro-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 120px 120px;
    gap: 10px;
    border-radius: 18px;
    overflow: hidden;
  }
  .intro-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .intro-img-1 { grid-row: span 2; height: 100%; }

  .listing-faq {
    margin-top: 56px;
    padding-top: 40px;
    border-top: 1px solid var(--border);
  }
  .listing-faq h2 {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 24px;
    letter-spacing: -0.02em;
  }
  .faq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .faq-card {
    background: #fff;
    border-radius: 18px;
    padding: 22px 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  .faq-card h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 10px;
    color: var(--navy);
    line-height: 1.35;
  }
  .faq-card p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--muted);
  }

  .prop-badge {
    position: absolute;
    left: 14px; top: 14px;
    padding: 6px 12px;
    background: rgba(255,255,255,0.95);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    color: var(--navy);
    box-shadow: var(--shadow-soft);
  }
  .prop-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .prop-reviews { font-size: 12px; color: var(--muted); font-weight: 600; }
  .prop-excerpt {
    font-size: 13px;
    line-height: 1.5;
    color: var(--muted);
    margin: 8px 0 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .prop-amenities {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }
  .prop-amenity {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    background: var(--lav-bg);
    color: var(--navy);
    border-radius: 999px;
  }
  .prop-card.is-list .prop-excerpt {
    -webkit-line-clamp: 3;
    margin-top: 10px;
  }
  .prop-card.is-list .prop-amenities { margin-top: 12px; }

  .results-controls {
    display: flex; align-items: center; gap: 14px;
  }
  .view-btn {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: grid; place-items: center;
    color: var(--muted);
    background: transparent;
    transition: background .15s, color .15s;
  }
  .view-btn:hover { background: var(--lav-bg); color: var(--navy); }
  .view-btn.is-active { color: var(--navy); background: #fff; box-shadow: var(--shadow-soft); }
  .filters-btn {
    display: inline-flex; align-items: center; gap: 12px;
    width: 210px; height: 64px;
    padding: 0 20px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: var(--shadow-card);
    color: var(--navy);
    font-weight: 600; font-size: 15px;
    justify-content: flex-start;
    transition: border-color .2s, box-shadow .2s, transform .15s;
  }
  .filters-btn > span { flex: 1; text-align: left; }
  .filters-btn:hover {
    border-color: var(--purple);
    box-shadow: 0 16px 40px rgba(79, 54, 232, 0.16);
    transform: translateY(-1px);
  }

  /* Grid */
  .prop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 30px;
  }
  .prop-grid.is-list {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .prop-card {
    background: #fff;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: var(--shadow-card);
    cursor: pointer;
    transition: transform .25s ease, box-shadow .25s ease;
    outline: none;
  }
  .prop-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
  .prop-card:hover .prop-img-wrap img { transform: scale(1.04); }
  .prop-card:focus-visible { box-shadow: 0 0 0 3px rgba(79, 54, 232, 0.35), var(--shadow-card); }

  .prop-img-wrap {
    position: relative;
    height: 218px;
    overflow: hidden;
    background: linear-gradient(135deg, #F5EFE6, #EAD9C7);
  }
  .prop-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .5s ease;
    display: block;
  }
  .bookmark-btn {
    position: absolute;
    right: 16px; bottom: 16px;
    width: 44px; height: 44px;
    background: #fff;
    border-radius: 50%;
    display: grid; place-items: center;
    color: var(--navy);
    box-shadow: var(--shadow-bookmark);
    transition: background .15s, color .15s, transform .15s;
  }
  .bookmark-btn:hover {
    background: #FFF0F7;
    color: var(--pink);
    transform: scale(1.06);
  }
  .bookmark-btn.is-active {
    background: #fff;
    color: var(--pink);
  }

  .prop-body {
    padding: 18px 22px 22px;
  }
  .prop-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #B6B5CB;
  }
  .prop-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--navy);
    margin: 10px 0 6px;
    line-height: 1.35;
    text-wrap: pretty;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .prop-meta {
    color: var(--muted);
    font-size: 14px;
  }
  .prop-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
  }
  .prop-price {
    display: flex; align-items: baseline; gap: 6px;
  }
  .prop-price .from { font-size: 13px; color: var(--muted); }
  .prop-price strong { font-size: 20px; font-weight: 800; color: var(--navy); letter-spacing: -0.01em; }
  .prop-price .currency { font-size: 14px; font-weight: 700; color: var(--navy); }
  .prop-rating {
    display: flex; align-items: center; gap: 8px;
  }
  .stars { display: inline-flex; gap: 1px; }
  .rating-num {
    font-size: 13px; font-weight: 700; color: var(--navy);
    margin-left: 2px;
  }

  /* List view variant */
  .prop-card.is-list { display: grid; grid-template-columns: minmax(200px, 340px) 1fr; }
  .prop-card.is-list .prop-img-wrap { height: 100%; min-height: 220px; }
  .prop-card.is-list .prop-body { padding: 22px 28px; display: flex; flex-direction: column; justify-content: center; }

  /* Pagination */
  .pagination {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  .pg-btn {
    min-width: 40px; height: 40px;
    padding: 0 10px;
    border-radius: 10px;
    background: #fff;
    color: var(--navy);
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(12, 12, 40, 0.04);
    transition: background .15s, color .15s, transform .15s;
  }
  .pg-btn:hover:not(:disabled) { background: var(--lav-bg); transform: translateY(-1px); }
  .pg-btn.is-active { background: var(--navy); color: #fff; }
  .pg-btn:disabled { opacity: .35; cursor: default; }
  .pg-dots { color: var(--muted); padding: 0 4px; }

  /* Filter drawer */
  .drawer-scrim {
    position: fixed; inset: 0;
    background: rgba(7, 7, 43, 0.35);
    backdrop-filter: blur(2px);
    z-index: 90;
    animation: fadeIn .2s ease;
  }
  .filter-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 440px;
    background: #fff;
    z-index: 91;
    display: flex; flex-direction: column;
    box-shadow: -30px 0 60px rgba(7, 7, 43, 0.15);
    animation: slideIn .28s cubic-bezier(.22,.61,.36,1);
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideIn { from { transform: translateX(20px); opacity: 0 } to { transform: none; opacity: 1 } }
  .drawer-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 26px 28px 18px;
    border-bottom: 1px solid var(--border);
  }
  .drawer-head h2 { margin: 0; font-size: 22px; font-weight: 800; }
  .drawer-close {
    width: 40px; height: 40px;
    border-radius: 10px;
    color: var(--navy);
    transition: background .15s;
  }
  .drawer-close:hover { background: var(--lav-bg); }
  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 18px 28px 28px;
  }
  .drawer-body section { padding: 16px 0; border-bottom: 1px solid var(--border); }
  .drawer-body section:last-child { border-bottom: none; }
  .drawer-body h3 { margin: 0 0 12px; font-size: 14px; font-weight: 700; color: var(--navy); }
  .price-range {
    display: flex; align-items: center; gap: 10px;
  }
  .price-range input {
    flex: 1; height: 48px;
    background: var(--search-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0 14px;
    font-family: inherit; font-size: 15px; font-weight: 600; color: var(--navy);
    outline: none;
  }
  .price-range input:focus { border-color: var(--purple); background: #fff; }
  .chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    padding: 8px 14px;
    background: var(--search-bg);
    border-radius: 999px;
    font-size: 13px; font-weight: 600; color: var(--navy);
    transition: background .15s, color .15s;
  }
  .chip:hover { background: var(--lav-soft); }
  .chip.is-on { background: var(--navy); color: #fff; }
  .num-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .num-btn {
    min-width: 56px; height: 44px;
    padding: 0 14px;
    border-radius: 12px;
    background: var(--search-bg);
    font-size: 14px; font-weight: 600; color: var(--navy);
    transition: background .15s;
  }
  .num-btn:hover { background: var(--lav-soft); }
  .num-btn.is-on { background: var(--navy); color: #fff; }
  .switch-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0;
    font-size: 14px; font-weight: 500; color: var(--navy);
  }
  .switch-row input[type="checkbox"] {
    width: 44px; height: 26px;
    appearance: none;
    background: #E2E2EC;
    border-radius: 99px; position: relative;
    transition: background .2s;
    cursor: pointer;
  }
  .switch-row input[type="checkbox"]::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    transition: transform .2s;
  }
  .switch-row input[type="checkbox"]:checked { background: var(--purple); }
  .switch-row input[type="checkbox"]:checked::after { transform: translateX(18px); }
  .drawer-foot {
    border-top: 1px solid var(--border);
    padding: 18px 28px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .link-btn {
    font-size: 14px; font-weight: 700; color: var(--navy);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .cta-pill {
    background: var(--navy);
    color: #fff;
    padding: 14px 24px;
    border-radius: 999px;
    font-size: 14px; font-weight: 700;
    transition: background .15s, transform .15s, box-shadow .2s;
  }
  .cta-pill:hover { background: #14143F; transform: translateY(-1px); box-shadow: 0 10px 24px rgba(6,6,39,0.25); }
  `;
  const s = document.createElement('style');
  s.id = 'listing-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { ListingPage, PropertyCard, Stars, PROPERTIES, PHOTOS });
