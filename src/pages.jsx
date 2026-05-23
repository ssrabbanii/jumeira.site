// Dedicated landing pages for top-nav items: Buy, Rent, Contact
// (Sell uses the existing HostPage)

const BuyPage = ({ setView, onOpenProperty, bookmarks, setBookmarks }) => {
  const [downPct, setDownPct] = React.useState(25);
  const [propPrice, setPropPrice] = React.useState(2400000);
  const [years, setYears] = React.useState(25);
  const rate = 0.045;
  const principal = propPrice * (1 - downPct / 100);
  const monthly = principal === 0 ? 0 : Math.round(
    (principal * (rate / 12)) / (1 - Math.pow(1 + rate / 12, -years * 12))
  );

  const toggleBookmark = (id) => setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="buy-page">
      <section className="buy-hero">
        <div className="buy-hero-text">
          <span className="cta-eyebrow">PROPERTIES FOR SALE</span>
          <h1>Own a piece of <span className="grad-text">Jumeirah</span>.</h1>
          <p>Curated luxury homes in Dubai's most coveted neighbourhoods. Vetted titles, transparent fees, financing guidance.</p>
          <div className="buy-cta-row">
            <button className="cta-pill" onClick={() => setView('listing')}>Browse all listings <IconArrowRight size={16} stroke={2} /></button>
            <button className="ghost-btn">Talk to a buying advisor</button>
          </div>
          <div className="buy-trust">
            <div><strong>2,140</strong><span>Active listings</span></div>
            <div><strong>$840M</strong><span>Closed in 2025</span></div>
            <div><strong>4.92 / 5</strong><span>Buyer satisfaction</span></div>
          </div>
        </div>
        <div className="buy-hero-art">
          <img src={PHOTOS.villa1} alt="" onError={onImgError} />
          <div className="float-tag">
            <span className="cta-eyebrow" style={{color: '#1E9B5C'}}>JUST LISTED</span>
            <strong>4-bed Beachside Pavilion</strong>
            <div className="muted">Palm Jumeirah · 8,200 sqft</div>
            <div className="price-line">2.4M USD</div>
          </div>
        </div>
      </section>

      <section className="buy-sec">
        <div className="sec-head">
          <div>
            <h2>Featured for-sale homes</h2>
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

      <section className="buy-sec calc-sec">
        <div className="calc">
          <div>
            <span className="cta-eyebrow">MORTGAGE CALCULATOR</span>
            <h2>Estimate your monthly</h2>
            <div className="calc-result">
              <strong>{monthly.toLocaleString()}</strong>
              <span>USD / mo</span>
            </div>
            <p className="muted">25-year mortgage at 4.5% APR. We work with five Dubai banks for premium-rate financing.</p>
          </div>
          <div className="calc-controls">
            <div className="calc-row">
              <div className="calc-label">
                <span>Property price</span>
                <strong>{(propPrice / 1000000).toFixed(1)}M USD</strong>
              </div>
              <input type="range" min="800000" max="8000000" step="100000" value={propPrice} onChange={e => setPropPrice(parseInt(e.target.value, 10))} />
            </div>
            <div className="calc-row">
              <div className="calc-label">
                <span>Down payment</span>
                <strong>{downPct}% · {((propPrice * downPct / 100) / 1000).toFixed(0)}k USD</strong>
              </div>
              <input type="range" min="10" max="50" step="5" value={downPct} onChange={e => setDownPct(parseInt(e.target.value, 10))} />
            </div>
            <div className="calc-row">
              <div className="calc-label">
                <span>Term</span>
                <strong>{years} years</strong>
              </div>
              <input type="range" min="5" max="30" step="5" value={years} onChange={e => setYears(parseInt(e.target.value, 10))} />
            </div>
          </div>
        </div>
      </section>

      <section className="buy-sec">
        <h2>How buying with Jumeira works</h2>
        <div className="how-grid">
          {[
            { n: '01', title: 'Pick a home', body: 'Browse vetted titles. Schedule a private viewing in 24 hours.' },
            { n: '02', title: 'Make an offer', body: 'We negotiate transparently with your dedicated buyer advisor.' },
            { n: '03', title: 'Get financed', body: 'Optional — we connect you to premium-rate mortgage partners.' },
            { n: '04', title: 'Close & move in', body: 'Title transfer, keys, and concierge handover — usually 21 days.' },
          ].map(s => (
            <div className="how-card" key={s.n}>
              <span className="how-n">{s.n}</span>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const RentPage = ({ setView, onOpenProperty, bookmarks, setBookmarks }) => {
  const [tenure, setTenure] = React.useState('nightly');
  const toggleBookmark = (id) => setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="rent-page">
      <section className="rent-hero">
        <div className="rent-bg">
          <img src={PHOTOS.villa6} alt="" onError={onImgError} />
          <div className="rent-overlay" />
        </div>
        <div className="rent-hero-inner">
          <span className="cta-eyebrow">SHORT, MID, OR LONG STAY</span>
          <h1>Rent with the flex you need.</h1>
          <p>From weekend escapes to year-long retreats — all Jumeira hosts, all the same curation.</p>

          <div className="tenure-tabs">
            {[
              { id: 'nightly', label: 'Nightly', sub: 'Up to 28 nights' },
              { id: 'monthly', label: 'Monthly', sub: 'Reduced rates' },
              { id: 'yearly', label: 'Yearly', sub: 'Long-term lease' },
            ].map(o => (
              <button key={o.id} className={tenure === o.id ? 'is-on' : ''} onClick={() => setTenure(o.id)}>
                <strong>{o.label}</strong>
                <span>{o.sub}</span>
              </button>
            ))}
          </div>

          <button className="cta-pill big" onClick={() => setView('listing')}>Browse all {tenure} rentals <IconArrowRight size={16} stroke={2} /></button>
        </div>
      </section>

      <section className="rent-sec">
        <div className="sec-head">
          <div>
            <h2>{
              tenure === 'nightly' ? 'Nightly favourites'
              : tenure === 'monthly' ? 'Monthly long-stay homes'
              : 'Yearly lease properties'
            }</h2>
            <p className="muted">{
              tenure === 'nightly' ? 'Booked tonight, in your home tomorrow.'
              : tenure === 'monthly' ? 'Discounts kick in at 28+ nights.'
              : 'Fully serviced 12-month leases.'
            }</p>
          </div>
          <button className="link-arrow" onClick={() => setView('listing')}>See all <IconArrowRight size={16} stroke={2} /></button>
        </div>
        <div className="prop-grid">
          {PROPERTIES.slice(3, 6).map(p => (
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

      <section className="rent-sec rent-perks">
        <h2>What's included in every rental</h2>
        <div className="perk-grid">
          {[
            { title: 'Hotel-grade housekeeping', body: 'Twice weekly on monthly stays. On-demand for nightly.' },
            { title: 'Furnished, plug-and-play', body: 'Linens, kitchenware, smart-home — show up with a suitcase.' },
            { title: 'High-speed Wi-Fi', body: '300 Mbps with mesh coverage. Work-ready, every home.' },
            { title: 'No-fee cancellations', body: 'Free up to 48 hours before check-in on nightly stays.' },
            { title: 'Direct host access', body: 'Chat in the app — usually replies under 30 minutes.' },
            { title: 'Concierge add-ons', body: 'Airport transfer, private chef, yacht — all bookable.' },
          ].map(p => (
            <div key={p.title} className="perk-card">
              <span className="perk-tick"><IconCheck size={16} stroke={2.4} /></span>
              <strong>{p.title}</strong>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rent-sec rent-cta">
        <div>
          <span className="cta-eyebrow">PLANNING A LONG STAY?</span>
          <h2>Monthly rates start 18% lower.</h2>
          <p>Stay 28 nights or more and we automatically apply our long-stay discount. Tell us where and we'll handpick options.</p>
          <button className="cta-pill" onClick={() => setView('listing')}>Find me a long stay <IconArrowRight size={16} stroke={2} /></button>
        </div>
        <div className="rent-cta-art">
          <img src={PHOTOS.villa5} alt="" onError={onImgError} />
        </div>
      </section>
    </main>
  );
};

const ContactPage = ({ setView }) => {
  const [form, setForm] = React.useState({ name: '', email: '', topic: 'guest', message: '' });
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="contact-page">
      <header className="contact-head">
        <span className="cta-eyebrow">GET IN TOUCH</span>
        <h1>We're here, around the clock.</h1>
        <p>Concierge, hosting questions, press, or partnerships — pick a path below.</p>
      </header>

      <section className="contact-grid">
        <div className="contact-form-card">
          <h2>Send a message</h2>
          <form onSubmit={submit}>
            <div className="form-grid">
              <label className="form-field">
                <span>Name</span>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" required />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" required />
              </label>
              <label className="form-field full">
                <span>I'm asking about</span>
                <div className="topic-row">
                  {[
                    { id: 'guest', label: 'A booking' },
                    { id: 'host', label: 'Hosting' },
                    { id: 'press', label: 'Press' },
                    { id: 'partner', label: 'Partnership' },
                  ].map(t => (
                    <button
                      type="button"
                      key={t.id}
                      className={`chip ${form.topic === t.id ? 'is-on' : ''}`}
                      onClick={() => setForm({...form, topic: t.id})}
                    >{t.label}</button>
                  ))}
                </div>
              </label>
              <label className="form-field full">
                <span>Message</span>
                <textarea className="msg-input" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us a bit more…" required />
              </label>
            </div>
            <button type="submit" className={`cta-pill big ${sent ? 'is-sent' : ''}`}>
              {sent ? <><IconCheck size={16} stroke={2.4} /> Message sent</> : <>Send message <IconArrowRight size={16} stroke={2} /></>}
            </button>
          </form>
        </div>

        <aside className="contact-side">
          <div className="contact-card">
            <span className="ccs-eyebrow live">● LIVE NOW</span>
            <h3>Concierge chat</h3>
            <p>Average reply in 4 minutes. 24/7.</p>
            <button className="cta-pill outline">Start chat</button>
          </div>
          <div className="contact-card">
            <h3>Email</h3>
            <a className="contact-link">hello@jumeira.com</a>
            <h3 style={{marginTop: 18}}>Phone</h3>
            <a className="contact-link">+971 4 555 0188</a>
          </div>
          <div className="contact-card">
            <h3>Offices</h3>
            <div className="office">
              <strong>Dubai HQ</strong>
              <span>Floor 28, Index Tower, DIFC</span>
              <small className="muted">Sun – Thu · 9am – 8pm</small>
            </div>
            <div className="office">
              <strong>London</strong>
              <span>21 Berkeley St, Mayfair</span>
              <small className="muted">Mon – Fri · 9am – 6pm</small>
            </div>
            <div className="office">
              <strong>Singapore</strong>
              <span>One Raffles Place, L24</span>
              <small className="muted">Mon – Fri · 9am – 6pm</small>
            </div>
          </div>
        </aside>
      </section>

      <section className="faq-sec">
        <h2>Quick answers</h2>
        <div className="faq-grid">
          {[
            { q: 'Is my booking refundable?', a: 'Most stays are free to cancel up to 48 hours before check-in. The cancellation policy is shown on every listing.' },
            { q: 'How are villas verified?', a: 'Every property is visited by our curation team before going live. We re-audit annually.' },
            { q: 'Can I bring my pet?', a: 'Many homes are pet-friendly — filter by "Pet friendly" on any listing page.' },
            { q: 'How fast can I list my home?', a: 'After submitting the 7-step wizard, our curators review within 48 hours.' },
            { q: 'Do you offer concierge?', a: 'Yes — every guest gets 24/7 concierge for restaurants, transfers, experiences, and more.' },
            { q: 'What is the platform fee?', a: 'A flat 7% service fee on guest bookings. Hosts pay nothing to list.' },
          ].map(f => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}<span className="faq-plus">+</span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

(() => {
  if (document.getElementById('pages-styles')) return;
  const css = `
  /* ───── BUY ───── */
  .buy-page { max-width: 1440px; margin: 0 auto; padding: 0 52px 80px; }
  .buy-hero {
    display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px;
    align-items: center;
    padding: 56px 0;
  }
  .buy-hero h1 {
    font-size: 60px; font-weight: 900;
    line-height: 1.04; letter-spacing: -0.03em;
    margin: 14px 0 18px;
    text-wrap: balance;
  }
  .buy-hero p { color: #3F4163; font-size: 17px; line-height: 1.55; max-width: 520px; text-wrap: pretty; }
  .buy-cta-row { display: flex; gap: 12px; margin: 30px 0; flex-wrap: wrap; }
  .buy-trust {
    display: flex; gap: 40px;
    padding-top: 24px; border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .buy-trust > div strong {
    display: block; font-size: 26px; font-weight: 800;
    letter-spacing: -0.02em; color: var(--navy);
  }
  .buy-trust > div span { font-size: 13px; color: var(--muted); }

  .buy-hero-art {
    position: relative;
    border-radius: 28px; overflow: hidden;
    height: 520px;
    box-shadow: var(--shadow-card-hover);
  }
  .buy-hero-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .float-tag {
    position: absolute;
    left: 22px; bottom: 22px;
    background: #fff;
    padding: 16px 20px;
    border-radius: 16px;
    box-shadow: var(--shadow-card-hover);
    min-width: 240px;
  }
  .float-tag strong { display: block; font-size: 15px; color: var(--navy); margin: 6px 0 2px; }
  .float-tag .muted { font-size: 13px; }
  .float-tag .price-line {
    margin-top: 10px;
    font-size: 22px; font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--navy);
  }

  .buy-sec { padding: 60px 0; border-top: 1px solid var(--border); }
  .buy-sec h2 {
    font-size: 32px; font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
    text-wrap: balance;
  }
  .buy-sec .sec-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 30px; }
  .calc-sec .calc { background: linear-gradient(135deg, #F7F6FD, #fff); border-radius: 28px; padding: 48px; box-shadow: var(--shadow-card); border: 1px solid var(--border); }

  /* ───── RENT ───── */
  .rent-page { max-width: 1440px; margin: 0 auto; padding: 0 0 80px; }
  .rent-hero {
    position: relative;
    margin: 24px 52px 0;
    border-radius: 28px;
    overflow: hidden;
    min-height: 520px;
    color: #fff;
    isolation: isolate;
  }
  .rent-bg { position: absolute; inset: 0; }
  .rent-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .rent-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(7,7,43,0.7) 0%, rgba(7,7,43,0.3) 50%, rgba(255,91,110,0.25) 100%);
  }
  .rent-hero-inner {
    position: relative;
    padding: 48px 56px 44px;
    max-width: 820px;
  }
  .rent-hero h1 {
    font-size: 60px; font-weight: 900;
    line-height: 1.04;
    letter-spacing: -0.03em;
    margin: 14px 0 14px;
    text-wrap: balance;
  }
  .rent-hero p {
    font-size: 17px;
    color: rgba(255,255,255,0.85);
    margin: 0 0 28px;
    max-width: 560px;
    text-wrap: pretty;
  }

  .tenure-tabs {
    display: inline-flex;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 18px;
    padding: 6px;
    backdrop-filter: blur(10px);
    margin-bottom: 28px;
    gap: 4px;
  }
  .tenure-tabs button {
    padding: 12px 22px;
    border-radius: 14px;
    text-align: left;
    color: #fff;
    transition: background .15s, color .15s;
    min-width: 130px;
  }
  .tenure-tabs button strong {
    display: block;
    font-size: 15px; font-weight: 800;
    color: inherit;
  }
  .tenure-tabs button span {
    display: block;
    font-size: 11px;
    color: inherit;
    opacity: 0.75;
    margin-top: 2px;
  }
  .tenure-tabs button.is-on {
    background: #fff;
    color: var(--navy);
  }
  .tenure-tabs button.is-on span { opacity: 0.6; }

  .rent-sec { padding: 56px 52px 0; }
  .rent-sec h2 {
    font-size: 32px; font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
    text-wrap: balance;
  }
  .rent-sec .sec-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 30px; }

  .rent-perks { padding-bottom: 0; }
  .perk-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 12px;
  }
  .perk-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 26px;
    box-shadow: var(--shadow-card);
  }
  .perk-tick {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--lav-soft);
    color: var(--purple);
    display: inline-grid; place-items: center;
    margin-bottom: 16px;
  }
  .perk-card strong { display: block; font-size: 16px; margin-bottom: 6px; }
  .perk-card p { color: var(--muted); font-size: 14px; line-height: 1.5; margin: 0; text-wrap: pretty; }

  .rent-cta {
    background: linear-gradient(135deg, #07072B 0%, #1A1454 50%, #4F36E8 110%);
    color: #fff;
    border-radius: 32px;
    padding: 56px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    margin: 56px 52px 0;
  }
  .rent-cta h2 { color: #fff; font-size: 44px; line-height: 1.1; margin: 12px 0 14px; }
  .rent-cta p { color: rgba(255,255,255,0.78); font-size: 16px; max-width: 440px; margin: 0 0 24px; }
  .rent-cta .cta-pill { background: #D9FF3F; color: var(--navy); }
  .rent-cta .cta-pill:hover { background: #E8FF66; }
  .rent-cta-art {
    height: 300px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.35);
  }
  .rent-cta-art img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ───── CONTACT ───── */
  .contact-page { max-width: 1240px; margin: 0 auto; padding: 56px 52px 80px; }
  .contact-head { text-align: center; max-width: 640px; margin: 0 auto 48px; }
  .contact-head h1 {
    font-size: 48px; font-weight: 800;
    letter-spacing: -0.02em;
    margin: 12px 0 12px;
    text-wrap: balance;
  }
  .contact-head p { color: var(--muted); font-size: 16px; }

  .contact-grid {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 36px;
    margin-bottom: 60px;
  }
  .contact-form-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 36px;
    box-shadow: var(--shadow-card);
  }
  .contact-form-card h2 { font-size: 24px; font-weight: 800; margin: 0 0 22px; }
  .topic-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .cta-pill.big.is-sent {
    background: linear-gradient(135deg, #1E9B5C, #34D17A);
    box-shadow: 0 10px 26px rgba(30, 155, 92, 0.35);
  }

  .contact-side { display: flex; flex-direction: column; gap: 16px; }
  .contact-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 24px;
    box-shadow: var(--shadow-card);
  }
  .contact-card h3 { font-size: 17px; font-weight: 800; margin: 6px 0 4px; }
  .contact-card p { font-size: 14px; color: var(--muted); margin: 0 0 14px; }
  .ccs-eyebrow {
    display: inline-block;
    font-size: 11px; font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--purple);
  }
  .ccs-eyebrow.live { color: #1E9B5C; animation: livePulse 2s ease-in-out infinite; }
  @keyframes livePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
  .cta-pill.outline {
    background: #fff;
    color: var(--navy);
    border: 1px solid var(--navy);
    box-shadow: none;
  }
  .cta-pill.outline:hover { background: var(--navy); color: #fff; }

  .contact-link {
    font-size: 15px; font-weight: 700;
    color: var(--navy);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: var(--pink);
    cursor: pointer;
  }
  .office { padding: 12px 0; border-top: 1px solid var(--border); }
  .office:first-of-type { border-top: none; padding-top: 0; }
  .office strong { display: block; font-size: 14px; }
  .office span { display: block; font-size: 13px; color: #3F4163; margin: 2px 0 2px; }
  .office .muted { font-size: 12px; }

  .faq-sec h2 {
    font-size: 32px; font-weight: 800;
    letter-spacing: -0.02em;
    text-align: center;
    margin: 0 0 28px;
    text-wrap: balance;
  }
  .faq-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px;
    max-width: 900px; margin: 0 auto;
  }
  .faq-item {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 0;
    overflow: hidden;
    transition: box-shadow .15s;
  }
  .faq-item[open] { box-shadow: var(--shadow-card); }
  .faq-item summary {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 22px;
    font-size: 15px; font-weight: 700;
    color: var(--navy);
    cursor: pointer;
    list-style: none;
  }
  .faq-item summary::-webkit-details-marker { display: none; }
  .faq-plus {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: var(--lav-bg);
    color: var(--navy);
    font-weight: 700; font-size: 18px;
    display: inline-grid; place-items: center;
    transition: transform .2s, background .15s;
  }
  .faq-item[open] .faq-plus { transform: rotate(45deg); background: var(--pink); color: #fff; }
  .faq-item p {
    margin: 0;
    padding: 0 22px 20px;
    color: #3F4163;
    font-size: 14px;
    line-height: 1.55;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .buy-page, .rent-page, .contact-page { padding-left: 24px; padding-right: 24px; }
    .rent-hero, .rent-cta, .rent-sec { margin-left: 0; margin-right: 0; padding-left: 0; padding-right: 0; }
    .rent-hero { margin: 20px 0 0; }
    .rent-cta { margin-top: 48px; padding: 40px; }
    .buy-hero { grid-template-columns: 1fr; gap: 32px; }
    .buy-hero-art { height: 360px; }
    .calc-sec .calc { padding: 32px; }
    .contact-grid { grid-template-columns: 1fr; }
    .perk-grid { grid-template-columns: 1fr 1fr; }
    .rent-cta { grid-template-columns: 1fr; padding: 36px; }
    .rent-cta-art { height: 220px; }
  }
  @media (max-width: 760px) {
    .buy-page, .rent-page, .contact-page { padding-left: 16px; padding-right: 16px; }
    .buy-hero { padding: 36px 0; gap: 28px; }
    .buy-hero h1 { font-size: 38px; }
    .buy-hero p { font-size: 15px; }
    .buy-hero-art { height: 280px; }
    .float-tag { left: 14px; bottom: 14px; padding: 12px 16px; min-width: 0; max-width: calc(100% - 28px); }
    .buy-trust { gap: 18px; }
    .buy-trust > div strong { font-size: 20px; }
    .buy-sec { padding: 40px 0; }
    .buy-sec h2 { font-size: 24px; }
    .buy-sec .sec-head, .rent-sec .sec-head { flex-direction: column; align-items: flex-start; gap: 8px; }
    .calc-sec .calc { padding: 22px; border-radius: 22px; }

    .rent-hero { margin: 16px 0 0; border-radius: 22px; }
    .rent-hero-inner { padding: 28px 24px 28px; }
    .rent-hero h1 { font-size: 32px; }
    .rent-hero p { font-size: 14px; }
    .tenure-tabs { display: flex; width: 100%; flex-direction: column; padding: 4px; border-radius: 14px; }
    .tenure-tabs button { min-width: 0; padding: 10px 14px; }
    .rent-sec { padding: 40px 0 0; }
    .rent-sec h2 { font-size: 24px; }
    .perk-grid { grid-template-columns: 1fr; gap: 12px; }
    .perk-card { padding: 22px; }
    .rent-cta { padding: 28px 22px; grid-template-columns: 1fr; border-radius: 22px; margin-top: 36px; }
    .rent-cta h2 { font-size: 28px; }
    .rent-cta-art { height: 180px; }

    .contact-page { padding-top: 28px; }
    .contact-head h1 { font-size: 30px; }
    .contact-head p { font-size: 14px; }
    .contact-form-card { padding: 22px; border-radius: 20px; }
    .faq-grid { grid-template-columns: 1fr; }
    .faq-sec h2 { font-size: 24px; }
  }
  `;
  const s = document.createElement('style');
  s.id = 'pages-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { BuyPage, RentPage, ContactPage });
