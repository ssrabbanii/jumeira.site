// Jumeira listing page — results header + property card grid

// Photo set — luxury villas / Mediterranean / Middle-Eastern courtyards.
// Use sturdy, reliable Unsplash photo URLs.
const PHOTOS = {
  villa1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop',
  villa2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop',
  villa3: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80&auto=format&fit=crop',
  villa4: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop',
  villa5: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80&auto=format&fit=crop',
  villa6: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80&auto=format&fit=crop',
  villa7: 'https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=900&q=80&auto=format&fit=crop',
  villa8: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop',
};

const PROPERTIES = [
  {
    id: 1,
    img: PHOTOS.villa3,
    label: 'VILLA',
    title: 'Five Palm Jumeirah Beachfront Villa — Pool, Jacuzzi',
    meta: '8 guests · 4 bedrooms',
    priceFrom: '1.920',
    rating: 4.6,
    bookmarked: true,
  },
  {
    id: 2,
    img: PHOTOS.villa2,
    label: 'VILLA',
    title: 'Two Bedroom Arabian Summerhouse Family Suite',
    meta: '6 guests · 3 bedrooms',
    priceFrom: '890',
    rating: 3.2,
    bookmarked: false,
  },
  {
    id: 3,
    img: PHOTOS.villa7,
    label: 'VILLA',
    title: 'Beach Front Villa in Five Palm Jumeirah Hotel',
    meta: '6 guests · 2 bedrooms',
    priceFrom: '750',
    rating: 5.0,
    bookmarked: false,
  },
  {
    id: 4,
    img: PHOTOS.villa4,
    label: 'VILLA',
    title: 'Arabian Summerhouse Superior',
    meta: '8 guests · 3 bedrooms',
    priceFrom: '1.299',
    rating: 3.8,
    bookmarked: false,
  },
  {
    id: 5,
    img: PHOTOS.villa5,
    label: 'VILLA',
    title: 'Stylish Luxury Sunshine Villa Perfect for Families',
    meta: '4 guests · 2 bedrooms',
    priceFrom: '1.000',
    rating: 4.9,
    bookmarked: false,
  },
  {
    id: 6,
    img: PHOTOS.villa6,
    label: 'VILLA',
    title: 'Spacious Garden Villa near the Beach',
    meta: '6 guests · 3 bedrooms',
    priceFrom: '1.450',
    rating: 3.6,
    bookmarked: false,
  },
  {
    id: 7,
    img: PHOTOS.villa8,
    label: 'VILLA',
    title: 'Palm-Lined Retreat with Private Plunge Pool',
    meta: '5 guests · 2 bedrooms',
    priceFrom: '1.180',
    rating: 4.7,
    bookmarked: false,
  },
  {
    id: 8,
    img: PHOTOS.villa1,
    label: 'VILLA',
    title: 'Architect-Designed Coastal Pavilion Villa',
    meta: '10 guests · 5 bedrooms',
    priceFrom: '2.450',
    rating: 4.8,
    bookmarked: false,
  },
  {
    id: 9,
    img: PHOTOS.villa6,
    label: 'VILLA',
    title: 'Terraced Marina Villa with Skyline View',
    meta: '6 guests · 3 bedrooms',
    priceFrom: '1.650',
    rating: 4.4,
    bookmarked: false,
  },
];

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
        <img src={property.img} alt={property.title} loading="lazy" />
        <button
          className={`bookmark-btn ${bookmarked ? 'is-active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onBookmarkToggle(property.id); }}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <IconBookmark size={20} filled={bookmarked} />
        </button>
      </div>
      <div className="prop-body">
        <div className="prop-label">{property.label}</div>
        <h3 className="prop-title">{property.title}</h3>
        <div className="prop-meta">{property.meta}</div>
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

const ResultsHeader = ({ viewMode, setViewMode, openFilters, count }) => (
  <div className="results-header">
    <div>
      <h1 className="results-title"><span className="dash">—</span> Dubai City, Jumeirah Villa</h1>
      <p className="results-sub">{count} Villas available in Dubai City</p>
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

const ListingPage = ({ onOpenProperty, activeCategory, setActiveCategory, bookmarks, setBookmarks }) => {
  const [viewMode, setViewMode] = React.useState('grid');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({ types: ['Villa'], bedrooms: 'Any', guests: 'Any', amenities: [] });

  const toggleBookmark = (id) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="listing">
      <ResultsHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        openFilters={() => setFilterOpen(true)}
        count="649"
      />
      <section className={`prop-grid ${viewMode === 'list' ? 'is-list' : ''}`}>
        {PROPERTIES.map(p => (
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
      <div className="pagination">
        <button className="pg-btn" disabled>‹</button>
        <button className="pg-btn is-active">1</button>
        <button className="pg-btn">2</button>
        <button className="pg-btn">3</button>
        <span className="pg-dots">…</span>
        <button className="pg-btn">37</button>
        <button className="pg-btn">›</button>
      </div>
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
  .prop-card.is-list { display: grid; grid-template-columns: 340px 1fr; }
  .prop-card.is-list .prop-img-wrap { height: 220px; }
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
