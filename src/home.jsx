// Jumeira homepage

const HomePage = ({ setView, onOpenProperty, bookmarks, setBookmarks }) => {
  const destinations = [
    { name: 'Dubai City', count: '649 stays', img: PHOTOS.villa1 },
    { name: 'Palm Jumeirah', count: '212 stays', img: PHOTOS.villa3 },
    { name: 'Abu Dhabi', count: '184 stays', img: PHOTOS.villa6 },
    { name: 'Maldives', count: '96 stays', img: PHOTOS.villa7 },
    { name: 'Bali', count: '420 stays', img: PHOTOS.villa5 },
    { name: 'Santorini', count: '167 stays', img: PHOTOS.villa4 },
  ];

  const featuredCats = [
    { id: 'villa', label: 'Villas', count: '2,140 homes', Icon: IconVilla },
    { id: 'house', label: 'Houses', count: '1,820 homes', Icon: IconHouse },
    { id: 'hotel', label: 'Hotels', count: '960 stays', Icon: IconHotel },
    { id: 'apartment', label: 'Apartments', count: '3,210 stays', Icon: IconApartment },
    { id: 'camp', label: 'Camp Houses', count: '320 unique', Icon: IconCamp },
  ];

  const toggleBookmark = (id) => setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-bg">
          <img src={PHOTOS.villa3} alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="dot" /> Curated stays · Premium hosts · 84 cities
          </div>
          <h1>Find your perfect <span className="grad-text">luxury stay</span>.</h1>
          <p className="hero-sub">Explore premium villas, apartments, hotels, and private homes in the world's most desirable destinations.</p>

          <div className="hero-search">
            <div className="hs-field">
              <span>Location</span>
              <div className="hs-val"><IconMapPin size={16} stroke={1.8} /> Dubai City</div>
            </div>
            <div className="hs-field">
              <span>Property</span>
              <div className="hs-val"><IconVilla size={16} stroke={1.8} /> Villa</div>
            </div>
            <div className="hs-field">
              <span>Dates</span>
              <div className="hs-val"><IconCalendar size={16} stroke={1.8} /> Jun 12 — Jun 17</div>
            </div>
            <div className="hs-field">
              <span>Guests</span>
              <div className="hs-val"><IconUsers size={16} stroke={1.8} /> 4 guests</div>
            </div>
            <button className="hs-cta" onClick={() => setView('listing')}>
              <IconSearch size={20} stroke={2} /> Search
            </button>
          </div>

          <div className="hero-marquee">
            <span className="muted">Popular searches —</span>
            {['Beachfront villas', 'Private pool', 'Architect homes', 'Family suites', 'City skyline apartments'].map(t => (
              <button key={t} className="marquee-chip" onClick={() => setView('listing')}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="home-sec">
        <div className="sec-head">
          <div>
            <h2>Browse by category</h2>
            <p className="muted">Stays for every kind of escape.</p>
          </div>
        </div>
        <div className="cat-cards">
          {featuredCats.map(c => (
            <button key={c.id} className="cat-card" onClick={() => setView('listing')}>
              <span className="cat-card-icon"><c.Icon size={26} stroke={1.7} /></span>
              <strong>{c.label}</strong>
              <span className="muted">{c.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-sec">
        <div className="sec-head">
          <div>
            <h2>Popular destinations</h2>
            <p className="muted">Where guests are flocking this season.</p>
          </div>
          <button className="link-arrow" onClick={() => setView('listing')}>See all <IconArrowRight size={16} stroke={2} /></button>
        </div>
        <div className="dest-grid">
          {destinations.map((d, i) => (
            <button key={d.name} className={`dest-card ${i === 0 ? 'is-tall' : ''}`} onClick={() => setView('listing')}>
              <img src={d.img} alt={d.name} loading="lazy" />
              <div className="dest-info">
                <strong>{d.name}</strong>
                <span>{d.count}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-sec">
        <div className="sec-head">
          <div>
            <h2>Featured luxury stays</h2>
            <p className="muted">Hand-picked by our editors.</p>
          </div>
          <button className="link-arrow" onClick={() => setView('listing')}>See all <IconArrowRight size={16} stroke={2} /></button>
        </div>
        <div className="prop-grid">
          {PROPERTIES.slice(0, 3).map(p => (
            <PropertyCard
              key={p.id}
              property={p}
              onOpen={onOpenProperty}
              bookmarked={!!bookmarks[p.id]}
              onBookmarkToggle={toggleBookmark}
              viewMode="grid"
            />
          ))}
        </div>
      </section>

      <section className="home-sec why">
        <h2>Why book with Jumeira</h2>
        <div className="why-grid">
          {[
            { title: 'Curated luxury', body: 'Every home is hand-vetted for architecture, comfort, and service.', icon: IconCheck },
            { title: 'Verified hosts', body: 'Background-checked, top-rated hosts you can actually trust.', icon: IconHeart },
            { title: 'Flexible booking', body: 'Free cancellation on most stays up to 48 hours before check-in.', icon: IconCalendar },
            { title: '24 / 7 concierge', body: 'Dedicated guest team on call from the moment you book.', icon: IconUsers },
          ].map((f, i) => (
            <div className="why-card" key={i}>
              <span className="why-icon"><f.icon size={22} stroke={1.8} /></span>
              <strong>{f.title}</strong>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-sec host-cta">
        <div>
          <span className="cta-eyebrow">FOR HOSTS</span>
          <h2>List your home with Jumeira.</h2>
          <p>Reach a premium audience looking for villas, apartments, hotels, and unique stays.</p>
          <button className="cta-pill" onClick={() => setView('host')}>Become a host <IconArrowRight size={16} stroke={2} /></button>
        </div>
        <div className="host-cta-art">
          <img src={PHOTOS.villa1} alt="" />
        </div>
      </section>
    </main>
  );
};

(() => {
  if (document.getElementById('home-styles')) return;
  const css = `
  .home { max-width: 1440px; margin: 0 auto; padding: 0 0 80px; }

  /* HERO */
  .hero {
    position: relative;
    margin: 24px 52px 0;
    border-radius: 28px;
    overflow: hidden;
    min-height: 480px;
    color: #fff;
    isolation: isolate;
  }
  .hero-bg { position: absolute; inset: 0; }
  .hero-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .hero-overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(160deg, rgba(7, 7, 43, 0.65) 0%, rgba(7, 7, 43, 0.2) 55%, rgba(216, 49, 184, 0.25) 100%);
  }
  .hero-inner {
    position: relative;
    padding: 48px 56px 40px;
    max-width: 920px;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 8px 14px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 999px;
    color: #fff;
    font-size: 13px; font-weight: 600;
    backdrop-filter: blur(10px);
  }
  .hero-eyebrow .dot { width: 7px; height: 7px; border-radius: 50%; background: #D9FF3F; box-shadow: 0 0 12px #D9FF3F; }
  .hero h1 {
    font-size: 56px; font-weight: 900;
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 16px 0 14px;
    text-wrap: balance;
  }
  .grad-text {
    background: linear-gradient(135deg, #FFB7C5 0%, #FF5B6E 30%, #EA3FA2 65%, #D9FF3F 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .hero-sub {
    font-size: 16px; line-height: 1.5;
    color: rgba(255,255,255,0.9);
    margin: 0;
    max-width: 560px;
    text-wrap: pretty;
  }
  .hero-search {
    margin-top: 24px;
    background: #fff;
    color: var(--navy);
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.2fr 1fr auto;
    padding: 8px;
    gap: 4px;
    align-items: stretch;
    box-shadow: 0 24px 60px rgba(7, 7, 43, 0.25);
  }
  .hs-field {
    padding: 10px 16px;
    border-radius: 12px;
    transition: background .15s;
    cursor: pointer;
  }
  .hs-field:hover { background: var(--lav-bg); }
  .hs-field span {
    display: block;
    font-size: 11px; font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .hs-val {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 15px; font-weight: 600;
    color: var(--navy);
    margin-top: 4px;
  }
  .hs-cta {
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    color: #fff;
    border-radius: 16px;
    padding: 0 28px;
    font-size: 15px; font-weight: 700;
    display: inline-flex; align-items: center; gap: 8px;
    box-shadow: 0 10px 24px rgba(234, 63, 162, 0.35);
    transition: transform .15s, box-shadow .2s;
  }
  .hs-cta:hover { transform: translateY(-1px); box-shadow: 0 14px 30px rgba(234, 63, 162, 0.5); }

  .hero-marquee {
    display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
    margin-top: 18px;
    color: rgba(255,255,255,0.85);
    font-size: 13px;
  }
  .hero-marquee .muted { color: rgba(255,255,255,0.7); }
  .marquee-chip {
    padding: 8px 14px;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    border-radius: 999px;
    font-weight: 600;
    backdrop-filter: blur(8px);
    transition: background .15s;
  }
  .marquee-chip:hover { background: rgba(255,255,255,0.22); }

  /* sections */
  .home-sec { padding: 64px 52px 0; }
  .sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; }
  .home-sec h2 { font-size: 32px; font-weight: 800; margin: 0 0 6px; letter-spacing: -0.02em; text-wrap: balance; }
  .home-sec .muted { font-size: 15px; }
  .link-arrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 14px; font-weight: 700; color: var(--navy);
    padding: 10px 16px;
    border-radius: 999px;
    transition: background .15s;
  }
  .link-arrow:hover { background: var(--lav-bg); }

  .cat-cards {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
  }
  .cat-card {
    background: #fff;
    padding: 22px;
    border-radius: 18px;
    text-align: left;
    box-shadow: var(--shadow-card);
    display: flex; flex-direction: column; gap: 6px;
    transition: transform .2s, box-shadow .2s;
  }
  .cat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-card-hover); }
  .cat-card-icon {
    width: 48px; height: 48px;
    background: var(--lav-soft);
    color: var(--purple);
    border-radius: 14px;
    display: grid; place-items: center;
    margin-bottom: 8px;
  }
  .cat-card strong { font-size: 16px; }
  .cat-card .muted { font-size: 13px; }

  .dest-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 200px 200px;
    gap: 16px;
  }
  .dest-card {
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    text-align: left;
    background: #EAD9C7;
    transition: transform .2s, box-shadow .2s;
    box-shadow: var(--shadow-card);
  }
  .dest-card.is-tall { grid-row: span 2; }
  .dest-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
  .dest-card::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(7,7,43,0.6) 100%);
  }
  .dest-info { position: absolute; left: 22px; bottom: 22px; color: #fff; z-index: 1; }
  .dest-info strong { display: block; font-size: 22px; font-weight: 800; letter-spacing: -0.01em; }
  .dest-info span { font-size: 13px; opacity: 0.88; }
  .dest-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-card-hover); }
  .dest-card:hover img { transform: scale(1.05); }

  .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .why-card {
    background: #fff;
    border-radius: 22px;
    padding: 24px;
    box-shadow: var(--shadow-card);
  }
  .why-icon {
    width: 48px; height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #FFE0EC, #F1EFFF);
    color: var(--purple);
    display: grid; place-items: center;
    margin-bottom: 16px;
  }
  .why-card strong { font-size: 17px; display: block; margin-bottom: 6px; }
  .why-card p { color: var(--muted); font-size: 14px; line-height: 1.5; margin: 0; text-wrap: pretty; }

  .host-cta {
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
    background: linear-gradient(135deg, #07072B 0%, #1A1454 50%, #4F36E8 110%);
    border-radius: 32px;
    color: #fff;
    padding: 56px 56px 56px;
    margin: 64px 52px 0;
    align-items: center;
    overflow: hidden;
  }
  .home-sec.host-cta { padding-left: 56px; padding-right: 56px; padding-top: 56px; }
  .cta-eyebrow {
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em;
    color: #D9FF3F;
  }
  .host-cta h2 {
    color: #fff;
    font-size: 44px;
    line-height: 1.1;
    margin: 12px 0 14px;
  }
  .host-cta p { color: rgba(255,255,255,0.78); font-size: 16px; margin: 0 0 24px; max-width: 440px; }
  .host-cta .cta-pill {
    background: #D9FF3F; color: var(--navy);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .host-cta .cta-pill:hover { background: #E8FF66; box-shadow: 0 14px 32px rgba(217, 255, 63, 0.35); }
  .host-cta-art {
    border-radius: 24px;
    overflow: hidden;
    height: 280px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  }
  .host-cta-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
  `;
  const s = document.createElement('style');
  s.id = 'home-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { HomePage });
