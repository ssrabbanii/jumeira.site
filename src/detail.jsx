// Property detail page

const Amenity = ({ Icon: I, label }) => (
  <div className="amenity">
    <span className="amenity-icon"><I size={22} stroke={1.8} /></span>
    <span>{label}</span>
  </div>
);

const DetailPage = ({ property, onBack, onReserve, bookmarks, setBookmarks }) => {
  const p = property || PROPERTIES[0];
  const isBookmarked = !!bookmarks[p.id];

  const galleryImages = [
    p.img,
    PHOTOS.villa1,
    PHOTOS.villa4,
    PHOTOS.villa5,
    PHOTOS.villa6,
  ];

  const [nights, setNights] = React.useState(5);
  const [guests, setGuests] = React.useState(4);

  const nightly = parseInt(p.priceFrom.replace(/\./g, '').replace(/,/g, ''), 10) || 1200;
  const subtotal = nightly * nights;
  const cleaning = 180;
  const serviceFee = Math.round(subtotal * 0.07);
  const total = subtotal + cleaning + serviceFee;

  return (
    <main className="detail">
      <nav className="breadcrumb">
        <button onClick={onBack}>Home</button>
        <span>/</span>
        <button onClick={onBack}>Dubai City</button>
        <span>/</span>
        <button onClick={onBack}>Jumeirah</button>
        <span>/</span>
        <span className="bc-current">Villa</span>
      </nav>

      <header className="detail-head">
        <div>
          <h1>{p.title}</h1>
          <div className="detail-meta-row">
            <div className="rating-pill">
              <Stars rating={p.rating} size={15} />
              <strong>{p.rating.toFixed(1)}</strong>
              <span>· 128 reviews</span>
            </div>
            <span className="meta-dot">·</span>
            <div className="loc-link"><IconMapPin size={16} stroke={1.8} /> Jumeirah, Dubai</div>
          </div>
        </div>
        <div className="detail-actions">
          <button className="ghost-btn"><IconShare size={18} stroke={1.8} /> Share</button>
          <button className={`ghost-btn ${isBookmarked ? 'is-on' : ''}`} onClick={() => setBookmarks(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
            <IconHeart size={18} filled={isBookmarked} /> {isBookmarked ? 'Saved' : 'Save'}
          </button>
        </div>
      </header>

      <section className="gallery">
        <div className="gallery-main">
          <img src={galleryImages[0]} alt="" />
        </div>
        <div className="gallery-side">
          {galleryImages.slice(1, 5).map((src, i) => (
            <div className="gallery-tile" key={i}>
              <img src={src} alt="" />
            </div>
          ))}
          <button className="show-all">Show all photos</button>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <div className="host-row">
            <div>
              <h2>Entire villa hosted by Layla</h2>
              <p className="muted">{p.meta} · 3 bathrooms · Private pool</p>
            </div>
            <div className="host-avatar"><span>LA</span></div>
          </div>

          <div className="feature-row">
            <div className="feature">
              <strong>Self check-in</strong>
              <span>Smart lock keeps your arrival smooth.</span>
            </div>
            <div className="feature">
              <strong>Super-rated host</strong>
              <span>Layla has hosted for 6+ years.</span>
            </div>
            <div className="feature">
              <strong>Free cancellation</strong>
              <span>Until 48 hours before your stay.</span>
            </div>
          </div>

          <div className="description">
            <h3>About this villa</h3>
            <p>
              A spacious, sun-flooded private villa moments from the Jumeirah shoreline.
              Wake up to soft Arabian gulf breezes, swim in the heated infinity pool,
              and unwind on a palm-shaded terrace lit by lanterns at night. Floor-to-ceiling
              glass opens the lounge onto a private courtyard with travertine flooring
              and bespoke rattan seating. Walk five minutes to the beach club.
            </p>
            <p>
              The home sleeps eight across four suites — each with its own ensuite, blackout
              curtains, and premium linens. The fully equipped chef's kitchen connects to a
              breakfast nook and outdoor dining for ten.
            </p>
          </div>

          <div className="amenities">
            <h3>What this place offers</h3>
            <div className="amenities-grid">
              <Amenity Icon={IconPool} label="Private pool" />
              <Amenity Icon={IconBeach} label="Beach access" />
              <Amenity Icon={IconWifi} label="High-speed Wi-Fi" />
              <Amenity Icon={IconAC} label="Air conditioning" />
              <Amenity Icon={IconKitchen} label="Full kitchen" />
              <Amenity Icon={IconParking} label="Free parking" />
              <Amenity Icon={IconGarden} label="Garden & courtyard" />
              <Amenity Icon={IconUsers} label="Concierge" />
            </div>
          </div>

          <div className="reviews">
            <h3>Recent reviews</h3>
            <div className="review-grid">
              {[
                { name: 'Sienna R.', date: 'April 2026', rating: 5, text: 'Absolutely breathtaking — every detail considered. The courtyard at sunset was unreal.' },
                { name: 'Marco D.', date: 'March 2026', rating: 5, text: 'Layla is a remarkable host. Concierge handled every dinner reservation for us.' },
                { name: 'Priya N.', date: 'February 2026', rating: 4, text: 'Beautiful villa, just steps from the beach. The pool was the highlight for our family.' },
                { name: 'Tom & Greta', date: 'January 2026', rating: 5, text: 'Quiet, private, and the kitchen is worth the stay alone. Will absolutely return.' },
              ].map((r, i) => (
                <article className="review" key={i}>
                  <header>
                    <div className="rev-avatar"><span>{r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span></div>
                    <div>
                      <strong>{r.name}</strong>
                      <div className="muted">{r.date}</div>
                    </div>
                  </header>
                  <Stars rating={r.rating} size={14} />
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="map-block">
            <h3>Where you'll be</h3>
            <div className="map-art" role="img" aria-label="Stylised map of Jumeirah">
              <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                <defs>
                  <linearGradient id="seaG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#E0EBF8"/>
                    <stop offset="1" stopColor="#C9DDF1"/>
                  </linearGradient>
                  <linearGradient id="landG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#FBEDD5"/>
                    <stop offset="1" stopColor="#F2D6A6"/>
                  </linearGradient>
                </defs>
                <rect width="600" height="280" fill="url(#seaG)"/>
                <path d="M0 120 Q 120 100 220 130 T 460 120 L 600 110 L 600 280 L 0 280 Z" fill="url(#landG)"/>
                <path d="M0 180 Q 140 160 260 180 T 600 175 L 600 280 L 0 280 Z" fill="#EFCC91" opacity=".7"/>
                {/* roads */}
                <path d="M40 220 Q 200 200 300 230 T 580 215" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M100 250 L 540 240" stroke="#fff" strokeWidth="2" fill="none" strokeDasharray="6 8"/>
                {/* pin */}
                <g transform="translate(320 160)">
                  <circle r="32" fill="#F83F8F" opacity=".15"/>
                  <circle r="20" fill="#F83F8F" opacity=".25"/>
                  <path d="M0 14 C -10 4 -10 -6 0 -12 C 10 -6 10 4 0 14 Z" fill="#F83F8F" stroke="#07072B" strokeWidth="1.4"/>
                  <circle cx="0" cy="-2" r="3" fill="#fff"/>
                </g>
              </svg>
              <div className="map-card">
                <strong>Jumeirah, Dubai</strong>
                <div className="muted">Exact location shared after booking</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="booking-card">
          <div className="booking-price">
            <strong>{p.priceFrom}</strong>
            <span>USD</span>
            <small>/ night</small>
          </div>
          <div className="booking-fields">
            <div className="field-row">
              <label>
                <span>Check in</span>
                <div className="field-val"><IconCalendar size={16} stroke={1.8} /> Jun 12, 2026</div>
              </label>
              <label>
                <span>Check out</span>
                <div className="field-val"><IconCalendar size={16} stroke={1.8} /> Jun {12 + nights}, 2026</div>
              </label>
            </div>
            <label className="field-full">
              <span>Guests</span>
              <div className="field-val"><IconUsers size={16} stroke={1.8} /> {guests} guests</div>
              <div className="guest-controls">
                <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
                <button onClick={() => setGuests(Math.min(12, guests + 1))}>+</button>
              </div>
            </label>
            <div className="nights-stepper">
              <span>Nights</span>
              <div>
                <button onClick={() => setNights(Math.max(1, nights - 1))}>−</button>
                <strong>{nights}</strong>
                <button onClick={() => setNights(Math.min(30, nights + 1))}>+</button>
              </div>
            </div>
          </div>
          <button className="reserve-btn" onClick={onReserve}>Reserve <IconArrowRight size={18} stroke={2} /></button>
          <p className="reserve-note">You won't be charged yet</p>
          <div className="fee-rows">
            <div><span>{nightly.toLocaleString()} USD × {nights} nights</span><span>{subtotal.toLocaleString()} USD</span></div>
            <div><span>Cleaning fee</span><span>{cleaning} USD</span></div>
            <div><span>Service fee</span><span>{serviceFee.toLocaleString()} USD</span></div>
            <div className="fee-total"><span>Total</span><span>{total.toLocaleString()} USD</span></div>
          </div>
        </aside>
      </section>
    </main>
  );
};

(() => {
  if (document.getElementById('detail-styles')) return;
  const css = `
  .detail { max-width: 1440px; margin: 0 auto; padding: 28px 52px 80px; }
  .breadcrumb {
    display: flex; align-items: center; gap: 8px;
    color: var(--muted); font-size: 14px; font-weight: 500;
  }
  .breadcrumb button { color: var(--muted); transition: color .15s; }
  .breadcrumb button:hover { color: var(--navy); }
  .breadcrumb .bc-current { color: var(--navy); font-weight: 600; }
  .detail-head {
    display: flex; justify-content: space-between; align-items: flex-end;
    gap: 24px;
    margin-top: 20px;
  }
  .detail-head h1 {
    font-size: 38px; font-weight: 800;
    line-height: 1.15; margin: 0;
    letter-spacing: -0.02em;
    max-width: 780px;
    text-wrap: balance;
  }
  .detail-meta-row {
    display: flex; align-items: center; gap: 14px;
    margin-top: 14px;
    color: var(--muted); font-size: 14px;
  }
  .rating-pill { display: inline-flex; align-items: center; gap: 6px; color: var(--navy); }
  .rating-pill strong { font-weight: 700; }
  .meta-dot { color: #BFC1D2; }
  .loc-link { display: inline-flex; align-items: center; gap: 6px; color: var(--navy); font-weight: 500; }
  .detail-actions { display: flex; gap: 10px; }
  .ghost-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 18px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 14px; font-weight: 600;
    color: var(--navy);
    transition: background .15s, color .15s, border-color .15s;
  }
  .ghost-btn:hover { background: var(--lav-bg); border-color: #D6D5EA; }
  .ghost-btn.is-on { color: var(--pink); border-color: #FFC5DC; background: #FFF0F7; }

  .gallery {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 14px;
    margin-top: 28px;
    height: 480px;
  }
  .gallery-main {
    border-radius: 24px; overflow: hidden;
    background: #EAD9C7;
  }
  .gallery-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gallery-side {
    position: relative;
    display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
    gap: 14px;
  }
  .gallery-tile { border-radius: 20px; overflow: hidden; background: #EAD9C7; }
  .gallery-tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s; }
  .gallery-tile:hover img { transform: scale(1.04); }
  .show-all {
    position: absolute;
    bottom: 16px; right: 16px;
    background: #fff;
    padding: 11px 18px;
    border-radius: 999px;
    font-size: 13px; font-weight: 700;
    color: var(--navy);
    box-shadow: var(--shadow-bookmark);
    transition: transform .15s;
  }
  .show-all:hover { transform: translateY(-1px); }

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 56px;
    margin-top: 40px;
  }
  .detail-main h2 { font-size: 26px; font-weight: 800; margin: 0 0 4px; letter-spacing: -0.01em; }
  .detail-main h3 { font-size: 22px; font-weight: 800; margin: 0 0 16px; }
  .host-row { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding-bottom: 28px; border-bottom: 1px solid var(--border); }
  .host-avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    color: #fff;
    display: grid; place-items: center;
    font-weight: 800; font-size: 18px;
    box-shadow: 0 10px 24px rgba(234, 63, 162, 0.3);
  }
  .muted { color: var(--muted); font-size: 14px; }
  .feature-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px 0; border-bottom: 1px solid var(--border); }
  .feature { display: flex; flex-direction: column; gap: 4px; }
  .feature strong { font-size: 15px; color: var(--navy); }
  .feature span { font-size: 13px; color: var(--muted); }
  .description { padding: 28px 0; border-bottom: 1px solid var(--border); }
  .description p { color: #3F4163; font-size: 15px; line-height: 1.65; max-width: 720px; text-wrap: pretty; }
  .amenities { padding: 28px 0; border-bottom: 1px solid var(--border); }
  .amenities-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px 24px;
  }
  .amenity { display: flex; align-items: center; gap: 14px; font-size: 15px; color: var(--navy); }
  .amenity-icon {
    width: 42px; height: 42px;
    background: var(--lav-bg);
    border-radius: 12px;
    display: grid; place-items: center;
    color: var(--purple);
  }

  .reviews { padding: 28px 0; }
  .review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .review {
    background: #fff;
    border-radius: 18px;
    padding: 22px;
    box-shadow: var(--shadow-card);
  }
  .review header { display: flex; gap: 12px; align-items: center; margin-bottom: 10px; }
  .rev-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--lav-soft); color: var(--purple);
    display: grid; place-items: center;
    font-weight: 700; font-size: 13px;
  }
  .review p { font-size: 14px; color: #3F4163; line-height: 1.55; margin: 10px 0 0; text-wrap: pretty; }

  .map-block { padding-top: 36px; }
  .map-art {
    position: relative;
    height: 280px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }
  .map-card {
    position: absolute;
    left: 24px; bottom: 24px;
    background: #fff;
    padding: 14px 18px;
    border-radius: 14px;
    box-shadow: var(--shadow-soft);
  }
  .map-card strong { display: block; font-size: 15px; }

  /* Booking card */
  .booking-card {
    background: #fff;
    border-radius: 24px;
    padding: 26px;
    box-shadow: var(--shadow-card-hover);
    position: sticky;
    top: 120px;
    height: fit-content;
  }
  .booking-price { display: flex; align-items: baseline; gap: 6px; }
  .booking-price strong { font-size: 28px; font-weight: 800; }
  .booking-price span { font-size: 14px; font-weight: 700; }
  .booking-price small { font-size: 14px; color: var(--muted); margin-left: 4px; }
  .booking-fields { margin-top: 20px; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; }
  .field-row label, .field-full { padding: 12px 14px; border-bottom: 1px solid var(--border); position: relative; cursor: pointer; }
  .field-row label:first-child { border-right: 1px solid var(--border); }
  .field-full { display: block; }
  .field-row label span, .field-full > span:first-child { display: block; font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
  .field-val { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--navy); margin-top: 4px; }
  .guest-controls { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); display: flex; gap: 6px; }
  .guest-controls button { width: 28px; height: 28px; border-radius: 50%; background: var(--lav-bg); color: var(--navy); font-weight: 700; }
  .nights-stepper {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 14px;
    font-size: 13px; color: var(--muted); font-weight: 600;
  }
  .nights-stepper > div { display: flex; align-items: center; gap: 10px; }
  .nights-stepper button { width: 28px; height: 28px; border-radius: 50%; background: var(--lav-bg); color: var(--navy); font-weight: 700; }
  .nights-stepper strong { color: var(--navy); font-size: 15px; min-width: 22px; text-align: center; }

  .reserve-btn {
    width: 100%;
    margin-top: 18px;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    height: 56px;
    border-radius: 16px;
    color: #fff;
    background: linear-gradient(135deg, #FF5B6E 0%, #EA3FA2 55%, #D931B8 100%);
    font-size: 16px; font-weight: 700;
    box-shadow: 0 14px 32px rgba(234, 63, 162, 0.32);
    transition: transform .15s, box-shadow .2s;
  }
  .reserve-btn:hover { transform: translateY(-1px); box-shadow: 0 18px 40px rgba(234, 63, 162, 0.45); }
  .reserve-note { text-align: center; font-size: 13px; color: var(--muted); margin: 10px 0 18px; }
  .fee-rows { display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
  .fee-rows > div { display: flex; justify-content: space-between; color: var(--navy); }
  .fee-rows > div span:first-child { color: #555776; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #D8D8E6; }
  .fee-total { padding-top: 12px; margin-top: 6px; border-top: 1px solid var(--border); font-weight: 800; }
  .fee-total span:first-child { text-decoration: none !important; }
  `;
  const s = document.createElement('style');
  s.id = 'detail-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { DetailPage, Amenity });
