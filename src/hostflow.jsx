// Host dashboard + multi-step List a property flow

const HOST_LISTINGS = [
  { id: 'h1', img: PHOTOS.villa3, title: 'Five Palm Jumeirah Beachfront Villa', status: 'Live', booked: 18, rate: 1920, rating: 4.6 },
  { id: 'h2', img: PHOTOS.villa1, title: 'Architect-Designed Coastal Pavilion', status: 'Live', booked: 12, rate: 2450, rating: 4.8 },
  { id: 'h3', img: PHOTOS.villa4, title: 'Arabian Summerhouse Superior', status: 'Snoozed', booked: 4, rate: 1299, rating: 3.8 },
];

const HostDashboard = ({ setView }) => {
  const [tab, setTab] = React.useState('overview');
  return (
    <main className="host-dash">
      <header className="dash-head">
        <div>
          <span className="cta-eyebrow">HOST DASHBOARD</span>
          <h1>Welcome back, Layla.</h1>
          <p className="muted">3 active listings · 4 bookings this week</p>
        </div>
        <div className="dash-actions">
          <button className="ghost-btn">Switch to guest mode</button>
          <button className="cta-pill" onClick={() => setView('list')}>+ Add new listing</button>
        </div>
      </header>

      <div className="dash-tabs">
        {['overview', 'listings', 'calendar', 'earnings', 'reviews'].map(t => (
          <button key={t} className={tab === t ? 'is-on' : ''} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && <Overview />}
      {tab === 'listings' && <ListingsTab />}
      {tab === 'calendar' && <CalendarTab />}
      {tab === 'earnings' && <EarningsTab />}
      {tab === 'reviews' && <ReviewsTab />}
    </main>
  );
};

const Overview = () => (
  <>
    <section className="kpi-row">
      {[
        { label: 'Bookings this month', val: '24', delta: '+18%', good: true },
        { label: 'Earnings (USD)', val: '32,140', delta: '+22%', good: true },
        { label: 'Occupancy', val: '78%', delta: '+4%', good: true },
        { label: 'Avg. rating', val: '4.74', delta: '−0.02', good: false },
      ].map(k => (
        <div key={k.label} className="kpi">
          <span>{k.label}</span>
          <strong>{k.val}</strong>
          <em className={k.good ? 'up' : 'down'}>{k.delta} vs last month</em>
        </div>
      ))}
    </section>

    <section className="dash-grid">
      <div className="chart-card">
        <header><h3>Earnings · last 8 weeks</h3><span className="muted small">USD</span></header>
        <svg viewBox="0 0 600 220" className="chart">
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#EA3FA2" stopOpacity="0.35"/>
              <stop offset="1" stopColor="#EA3FA2" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1="20" x2="580" y1={40 + i * 50} y2={40 + i * 50} stroke="#ECECF4" />
          ))}
          {(() => {
            const pts = [62, 84, 71, 95, 110, 88, 132, 158];
            const max = 170;
            const px = pts.map((v, i) => [20 + i * 80, 190 - (v / max) * 150]);
            const dArea = `M${px[0][0]},190 ` + px.map(p => `L${p[0]},${p[1]}`).join(' ') + ` L${px[px.length-1][0]},190 Z`;
            const dLine = `M${px[0][0]},${px[0][1]} ` + px.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ');
            return (
              <>
                <path d={dArea} fill="url(#chartFill)" />
                <path d={dLine} stroke="#EA3FA2" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {px.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#fff" stroke="#EA3FA2" strokeWidth="2.5" />)}
              </>
            );
          })()}
          {['W1','W2','W3','W4','W5','W6','W7','W8'].map((l, i) => (
            <text key={l} x={20 + i * 80} y="210" fontSize="11" fill="#8A8BA3" textAnchor="middle" fontFamily="Inter">{l}</text>
          ))}
        </svg>
      </div>
      <div className="action-card">
        <h3>To-do list</h3>
        <ul className="todo-list">
          <li><span className="dot warn"></span>Approve 2 booking requests <button className="text-link">Review</button></li>
          <li><span className="dot info"></span>Confirm Friday's cleaner <button className="text-link">Confirm</button></li>
          <li><span className="dot good"></span>Reply to Sienna's message <button className="text-link">Reply</button></li>
          <li><span className="dot warn"></span>Update July calendar <button className="text-link">Open</button></li>
        </ul>
      </div>
    </section>

    <section className="dash-grid">
      <div className="recent-card">
        <header><h3>Recent bookings</h3><button className="text-link">View all →</button></header>
        <table className="recent-tbl">
          <thead>
            <tr><th>Guest</th><th>Listing</th><th>Dates</th><th>Nights</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td><div className="avatar-row"><div className="mini-avatar">SR</div>Sienna R.</div></td><td>Five Palm Jumeirah</td><td>Jun 12 → Jun 17</td><td>5</td><td>9,820 USD</td><td><span className="status-pill ok">Confirmed</span></td></tr>
            <tr><td><div className="avatar-row"><div className="mini-avatar">MD</div>Marco D.</div></td><td>Coastal Pavilion</td><td>Jun 18 → Jun 22</td><td>4</td><td>9,800 USD</td><td><span className="status-pill warn">Pending</span></td></tr>
            <tr><td><div className="avatar-row"><div className="mini-avatar">PN</div>Priya N.</div></td><td>Five Palm Jumeirah</td><td>Jun 24 → Jun 28</td><td>4</td><td>7,680 USD</td><td><span className="status-pill ok">Confirmed</span></td></tr>
            <tr><td><div className="avatar-row"><div className="mini-avatar">TG</div>Tom & Greta</div></td><td>Summerhouse</td><td>Jul 2 → Jul 9</td><td>7</td><td>9,093 USD</td><td><span className="status-pill ok">Confirmed</span></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </>
);

const ListingsTab = () => (
  <section className="listings-table">
    {HOST_LISTINGS.map(l => (
      <article key={l.id} className="host-listing">
        <img src={l.img} alt="" />
        <div className="hl-body">
          <header>
            <strong>{l.title}</strong>
            <span className={`status-pill ${l.status === 'Live' ? 'ok' : 'warn'}`}>{l.status}</span>
          </header>
          <div className="hl-stats">
            <div><span>Booked nights</span><strong>{l.booked} / 30</strong></div>
            <div><span>Nightly rate</span><strong>{l.rate} USD</strong></div>
            <div><span>Rating</span><strong><Stars rating={l.rating} size={12} /> {l.rating.toFixed(1)}</strong></div>
          </div>
        </div>
        <div className="hl-actions">
          <button className="ghost-btn">Edit</button>
          <button className="cta-pill">Manage</button>
        </div>
      </article>
    ))}
  </section>
);

const CalendarTab = () => {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // start padding
  const monthName = 'June 2026';
  const bookedRanges = [[11, 16], [22, 26]];
  const isBooked = (d) => bookedRanges.some(([a, b]) => d >= a && d <= b);
  const isToday = (d) => d === 4;
  return (
    <section className="cal-card">
      <header>
        <button className="cal-arrow">‹</button>
        <h3>{monthName}</h3>
        <button className="cal-arrow">›</button>
        <span style={{flex: 1}} />
        <span className="legend"><i className="lg-d"></i>Available</span>
        <span className="legend"><i className="lg-b"></i>Booked</span>
        <button className="cta-pill">Block dates</button>
      </header>
      <div className="cal-grid">
        {['S','M','T','W','T','F','S'].map((d, i) => <span key={i} className="dow">{d}</span>)}
        {days.map((d, i) => (
          <div key={i} className={`cal-day ${d < 1 || d > 30 ? 'pad' : ''} ${isBooked(d) ? 'booked' : ''} ${isToday(d) ? 'today' : ''}`}>
            {d > 0 && d <= 30 && <>
              <span className="cal-d">{d}</span>
              {isBooked(d) && <span className="cal-tag">Sienna R.</span>}
              {!isBooked(d) && d > 4 && <span className="cal-rate">{1920 + (d % 5) * 80}</span>}
            </>}
          </div>
        ))}
      </div>
    </section>
  );
};

const EarningsTab = () => (
  <>
    <section className="kpi-row">
      <div className="kpi"><span>YTD earnings</span><strong>184,520 USD</strong><em className="up">+34% YoY</em></div>
      <div className="kpi"><span>Pending payout</span><strong>9,820 USD</strong><em>Releases Jun 19</em></div>
      <div className="kpi"><span>Tax (estimated)</span><strong>23,840 USD</strong><em>Download statement</em></div>
    </section>
    <section className="dash-grid">
      <div className="chart-card big">
        <header><h3>Monthly earnings</h3></header>
        <svg viewBox="0 0 600 220" className="chart">
          {Array.from({length: 12}).map((_, i) => {
            const heights = [38, 52, 60, 74, 88, 96, 120, 132, 108, 90, 78, 64];
            const h = heights[i];
            return (
              <g key={i}>
                <rect x={26 + i * 47} y={190 - h} width="30" height={h} rx="6" fill="url(#barG)" />
              </g>
            );
          })}
          <defs>
            <linearGradient id="barG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#FF5B6E" />
              <stop offset="1" stopColor="#4F36E8" />
            </linearGradient>
          </defs>
          {['J','F','M','A','M','J','J','A','S','O','N','D'].map((l, i) => (
            <text key={i} x={41 + i * 47} y="208" fontSize="11" fill="#8A8BA3" textAnchor="middle" fontFamily="Inter">{l}</text>
          ))}
        </svg>
      </div>
      <div className="action-card">
        <h3>Next payout</h3>
        <div className="payout-num">9,820 <small>USD</small></div>
        <p className="muted small">Direct deposit on Jun 19, 2026 · ENBD •••• 8842</p>
        <button className="cta-pill" style={{width:'100%', marginTop: 12}}>Manage payouts</button>
      </div>
    </section>
  </>
);

const ReviewsTab = () => (
  <section className="reviews">
    <h3 className="sec-head-h3">Recent reviews</h3>
    <div className="review-grid">
      {[
        { name: 'Sienna R.', text: 'Absolutely breathtaking — every detail considered. Layla is a fantastic host.', rating: 5, when: 'April 2026' },
        { name: 'Marco D.', text: 'Concierge handled every dinner reservation for us. Will be back.', rating: 5, when: 'March 2026' },
        { name: 'Priya N.', text: 'Beautiful villa, just steps from the beach. The pool was the highlight.', rating: 4, when: 'February 2026' },
        { name: 'Tom & Greta', text: 'Quiet, private, and the kitchen is worth the stay alone.', rating: 5, when: 'January 2026' },
      ].map((r, i) => (
        <article className="review" key={i}>
          <header>
            <div className="rev-avatar"><span>{r.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span></div>
            <div><strong>{r.name}</strong><div className="muted">{r.when}</div></div>
          </header>
          <Stars rating={r.rating} size={14} />
          <p>{r.text}</p>
          <button className="text-link">Reply</button>
        </article>
      ))}
    </div>
  </section>
);

// ─── List-a-property multi-step onboarding ────────────────────────────────

const STEPS = [
  { id: 'type', label: 'Property type' },
  { id: 'location', label: 'Location' },
  { id: 'space', label: 'Space' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'photos', label: 'Photos' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'review', label: 'Review' },
];

const ListPropertyPage = ({ setView }) => {
  const [stepIdx, setStepIdx] = React.useState(0);
  const [data, setData] = React.useState({
    type: 'villa', location: 'Jumeirah, Dubai', address: 'Beachside Villas, Building 14',
    bedrooms: 4, beds: 5, baths: 3, guests: 8,
    amenities: ['Private pool', 'Wi-Fi', 'Air conditioning'],
    title: 'Sunlit Jumeirah Beachside Villa',
    description: 'A premium beach-adjacent villa with private pool, four ensuite bedrooms, and a generous outdoor terrace.',
    rate: 1480,
    weekendRate: 1820,
    cleaning: 180,
  });
  const step = STEPS[stepIdx];
  const isLast = stepIdx === STEPS.length - 1;

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <main className="list-prop">
      <button className="back-btn" onClick={() => setView('host-dash')}>← Save and exit</button>
      <div className="list-grid">
        <aside className="list-side">
          <h2>List your property</h2>
          <p className="muted">7-step setup · saves automatically.</p>
          <ol className="list-steps">
            {STEPS.map((s, i) => (
              <li key={s.id} className={`${i === stepIdx ? 'is-on' : ''} ${i < stepIdx ? 'is-done' : ''}`}>
                <span>{i < stepIdx ? '✓' : i + 1}</span>{s.label}
              </li>
            ))}
          </ol>
        </aside>
        <div className="list-main">
          <header>
            <span className="cta-eyebrow">STEP {stepIdx + 1} OF 7</span>
            <h1>{step.label}</h1>
          </header>

          {step.id === 'type' && (
            <div className="type-cards">
              {[
                { id: 'villa', label: 'Villa', sub: 'Standalone luxury home', Icon: IconVilla },
                { id: 'house', label: 'House', sub: 'Family home or townhouse', Icon: IconHouse },
                { id: 'hotel', label: 'Hotel', sub: 'Boutique or branded property', Icon: IconHotel },
                { id: 'apt', label: 'Apartment', sub: 'In a residential building', Icon: IconApartment },
                { id: 'camp', label: 'Camp House', sub: 'Unique outdoor stay', Icon: IconCamp },
              ].map(t => (
                <button key={t.id} className={`type-pick ${data.type === t.id ? 'is-on' : ''}`} onClick={() => update('type', t.id)}>
                  <t.Icon size={32} stroke={1.6} />
                  <strong>{t.label}</strong>
                  <span>{t.sub}</span>
                </button>
              ))}
            </div>
          )}

          {step.id === 'location' && (
            <>
              <div className="form-grid">
                <label className="form-field full">
                  <span>Address</span>
                  <input value={data.address} onChange={e => update('address', e.target.value)} />
                </label>
                <label className="form-field full">
                  <span>City / region</span>
                  <input value={data.location} onChange={e => update('location', e.target.value)} />
                </label>
              </div>
              <div className="map-preview">
                <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice">
                  <rect width="600" height="240" fill="#E0EBF8" />
                  <path d="M0 120 Q 140 100 260 140 T 600 110 L 600 240 L 0 240 Z" fill="#FBEDD5" />
                  <path d="M0 170 Q 160 150 280 180 T 600 175 L 600 240 L 0 240 Z" fill="#EFCC91" />
                  <path d="M40 200 Q 200 180 320 210 T 580 200" stroke="#fff" strokeWidth="2" fill="none" />
                  <g transform="translate(300 150)">
                    <circle r="36" fill="#F83F8F" opacity=".15"/>
                    <path d="M0 16 C -12 4 -12 -8 0 -16 C 12 -8 12 4 0 16 Z" fill="#F83F8F" stroke="#07072B" strokeWidth="1.4"/>
                  </g>
                </svg>
                <span className="map-hint">Exact location stays private until booked.</span>
              </div>
            </>
          )}

          {step.id === 'space' && (
            <div className="space-row">
              {[
                ['guests', 'Guests', 1, 16],
                ['bedrooms', 'Bedrooms', 1, 12],
                ['beds', 'Beds', 1, 16],
                ['baths', 'Bathrooms', 1, 10],
              ].map(([k, label, min, max]) => (
                <div className="counter-row" key={k}>
                  <div>
                    <strong>{label}</strong>
                    <span className="muted">How many {label.toLowerCase()}?</span>
                  </div>
                  <div className="counter">
                    <button onClick={() => update(k, Math.max(min, data[k] - 1))}>−</button>
                    <strong>{data[k]}</strong>
                    <button onClick={() => update(k, Math.min(max, data[k] + 1))}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step.id === 'amenities' && (
            <div className="chip-row big">
              {['Private pool','Jacuzzi','Beach access','Wi-Fi','Air conditioning','Full kitchen','Free parking','Balcony','Garden','24/7 security','Gym','Spa','BBQ','Fireplace','Concierge'].map(a => {
                const on = data.amenities.includes(a);
                return (
                  <button
                    key={a}
                    className={`chip ${on ? 'is-on' : ''}`}
                    onClick={() => update('amenities', on ? data.amenities.filter(x => x !== a) : [...data.amenities, a])}
                  >{a}</button>
                );
              })}
            </div>
          )}

          {step.id === 'photos' && (
            <>
              <p className="muted">Upload at least 5 high-resolution exterior and interior shots. Our photo team can also visit on request.</p>
              <div className="photo-uploader">
                {[PHOTOS.villa1, PHOTOS.villa3, PHOTOS.villa5, PHOTOS.villa6].map((src, i) => (
                  <div className="photo-tile" key={i}>
                    <img src={src} alt="" />
                    {i === 0 && <span className="photo-cover">Cover</span>}
                  </div>
                ))}
                <button className="photo-upload">
                  <span>+</span>
                  Upload photo
                </button>
              </div>
              <label className="check-row" style={{marginTop: 20}}>
                <input type="checkbox" />
                <span>Send a professional photographer (free for premium listings)</span>
              </label>
            </>
          )}

          {step.id === 'pricing' && (
            <>
              <div className="form-grid">
                <label className="form-field full">
                  <span>Listing title</span>
                  <input value={data.title} onChange={e => update('title', e.target.value)} />
                </label>
                <label className="form-field full">
                  <span>Description</span>
                  <textarea className="msg-input" rows={4} value={data.description} onChange={e => update('description', e.target.value)} />
                </label>
              </div>
              <div className="price-grid">
                <div className="price-card">
                  <span className="muted small">Weeknight rate</span>
                  <div className="price-input">
                    <input type="number" value={data.rate} onChange={e => update('rate', parseInt(e.target.value, 10) || 0)} />
                    <span>USD</span>
                  </div>
                </div>
                <div className="price-card">
                  <span className="muted small">Weekend rate</span>
                  <div className="price-input">
                    <input type="number" value={data.weekendRate} onChange={e => update('weekendRate', parseInt(e.target.value, 10) || 0)} />
                    <span>USD</span>
                  </div>
                </div>
                <div className="price-card">
                  <span className="muted small">Cleaning fee</span>
                  <div className="price-input">
                    <input type="number" value={data.cleaning} onChange={e => update('cleaning', parseInt(e.target.value, 10) || 0)} />
                    <span>USD</span>
                  </div>
                </div>
              </div>
              <div className="pricing-tip">
                <strong>💡 Suggested rate for Jumeirah villas:</strong> 1,200 – 2,400 USD / night
              </div>
            </>
          )}

          {step.id === 'review' && (
            <div className="review-summary">
              <div className="rev-preview">
                <img src={PHOTOS.villa1} alt="" />
                <div>
                  <span className="prop-label">VILLA</span>
                  <strong>{data.title}</strong>
                  <div className="muted">{data.guests} guests · {data.bedrooms} bedrooms · {data.beds} beds · {data.baths} baths</div>
                  <p>{data.description}</p>
                  <div className="amen-pills">
                    {data.amenities.map(a => <span key={a} className="badge">{a}</span>)}
                  </div>
                  <div className="rev-price"><strong>{data.rate}</strong> USD / weeknight · {data.weekendRate} weekend</div>
                </div>
              </div>
              <p className="muted" style={{marginTop: 20}}>Once submitted, our curators review your listing within 48 hours.</p>
            </div>
          )}

          <footer className="list-foot">
            <button className="ghost-btn" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0}>← Back</button>
            <button className="cta-pill big" onClick={() => isLast ? setView('host-dash') : setStepIdx(stepIdx + 1)}>
              {isLast ? 'Submit listing' : 'Continue'} <IconArrowRight size={16} stroke={2} />
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
};

(() => {
  if (document.getElementById('host-dash-styles')) return;
  const css = `
  .host-dash { max-width: 1440px; margin: 0 auto; padding: 28px 52px 80px; }
  .dash-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px; }
  .dash-head h1 { font-size: 32px; font-weight: 800; margin: 6px 0 4px; letter-spacing: -0.02em; }
  .dash-actions { display: flex; gap: 10px; }
  .dash-tabs {
    display: flex; gap: 4px;
    background: var(--lav-bg);
    border-radius: 999px;
    padding: 4px;
    width: fit-content;
    margin-bottom: 22px;
  }
  .dash-tabs button { padding: 10px 18px; border-radius: 999px; font-size: 13px; font-weight: 700; color: var(--muted); }
  .dash-tabs button.is-on { background: #fff; color: var(--navy); box-shadow: var(--shadow-soft); }

  .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 18px; }
  .kpi-row > .kpi { padding: 22px; background: #fff; border-radius: 18px; border: 1px solid var(--border); box-shadow: var(--shadow-card); }
  .kpi > span { display: block; font-size: 13px; color: var(--muted); }
  .kpi > strong { display: block; font-size: 30px; font-weight: 800; letter-spacing: -0.02em; margin: 6px 0 4px; }
  .kpi > em { font-size: 12px; font-weight: 600; font-style: normal; color: var(--muted); }
  .kpi > em.up { color: #1E9B5C; }
  .kpi > em.down { color: #D9358F; }

  .dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 18px; margin-bottom: 18px; }
  .chart-card, .action-card, .recent-card {
    background: #fff;
    border-radius: 22px;
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  .chart-card.big { grid-column: span 1; }
  .chart-card header, .action-card header, .recent-card header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .chart-card h3, .action-card h3, .recent-card h3 { margin: 0; font-size: 16px; font-weight: 800; }
  .chart { width: 100%; height: auto; display: block; }

  .todo-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .todo-list li {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px;
    background: #FAFAFD;
    border-radius: 12px;
    font-size: 14px;
    color: var(--navy);
  }
  .todo-list li button { margin-left: auto; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex: 0 0 auto; }
  .dot.warn { background: #FFB152; }
  .dot.info { background: #4F36E8; }
  .dot.good { background: #1E9B5C; }

  .recent-tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
  .recent-tbl th { text-align: left; font-weight: 700; color: var(--muted); padding: 10px 0; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid var(--border); }
  .recent-tbl td { padding: 14px 0; border-bottom: 1px solid var(--border); color: var(--navy); }
  .recent-tbl tr:last-child td { border-bottom: none; }
  .avatar-row { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; }
  .mini-avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--lav-soft); color: var(--purple); display: grid; place-items: center; font-size: 11px; font-weight: 700; }
  .status-pill {
    padding: 5px 10px; border-radius: 999px;
    font-size: 11px; font-weight: 700;
  }
  .status-pill.ok { background: #E8F8EF; color: #1E9B5C; }
  .status-pill.warn { background: #FFF4E6; color: #C97200; }

  .listings-table { display: flex; flex-direction: column; gap: 14px; }
  .host-listing {
    display: grid; grid-template-columns: 180px 1fr auto;
    gap: 22px; align-items: center;
    padding: 18px;
    background: #fff;
    border-radius: 18px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  .host-listing img { width: 180px; height: 130px; border-radius: 14px; object-fit: cover; }
  .hl-body header { display: flex; align-items: center; gap: 10px; }
  .hl-body strong { font-size: 17px; }
  .hl-stats { display: flex; gap: 32px; margin-top: 10px; }
  .hl-stats > div span { display: block; font-size: 12px; color: var(--muted); }
  .hl-stats > div strong { font-size: 15px; }
  .hl-actions { display: flex; gap: 8px; }

  .cal-card {
    background: #fff;
    border-radius: 22px;
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  .cal-card header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
  .cal-card h3 { margin: 0; font-size: 18px; font-weight: 800; min-width: 140px; }
  .cal-arrow { width: 36px; height: 36px; border-radius: 10px; background: var(--lav-bg); color: var(--navy); font-size: 18px; font-weight: 700; }
  .legend { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); margin-right: 8px; }
  .legend i { width: 12px; height: 12px; border-radius: 4px; }
  .legend .lg-d { background: #E8F8EF; }
  .legend .lg-b { background: #FFE0EC; }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .cal-grid .dow { font-size: 11px; font-weight: 700; color: var(--muted); padding: 6px; text-align: center; letter-spacing: 0.04em; }
  .cal-day {
    aspect-ratio: 1;
    background: #FAFAFD;
    border-radius: 10px;
    padding: 8px;
    display: flex; flex-direction: column; justify-content: space-between;
    font-size: 13px;
    border: 1px solid var(--border);
  }
  .cal-day.pad { visibility: hidden; }
  .cal-day .cal-d { font-weight: 700; }
  .cal-day .cal-rate { font-size: 11px; color: var(--muted); align-self: flex-end; }
  .cal-day.booked { background: #FFE0EC; border-color: #FFB7CD; }
  .cal-day.booked .cal-tag { font-size: 10px; font-weight: 700; color: #D9358F; }
  .cal-day.today { border: 2px solid var(--purple); background: #fff; }

  .payout-num { font-size: 36px; font-weight: 800; letter-spacing: -0.02em; }
  .payout-num small { font-size: 14px; font-weight: 700; color: var(--muted); margin-left: 4px; }

  /* List property */
  .list-prop { max-width: 1240px; margin: 0 auto; padding: 28px 52px 80px; }
  .list-grid { display: grid; grid-template-columns: 280px 1fr; gap: 36px; margin-top: 18px; }
  .list-side {
    background: #fff;
    border-radius: 22px;
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    position: sticky;
    top: 120px;
    height: fit-content;
  }
  .list-side h2 { margin: 0 0 4px; font-size: 18px; font-weight: 800; }
  .list-side p { margin: 0 0 18px; }
  .list-steps { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .list-steps li {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 14px; font-weight: 600;
    color: var(--muted);
  }
  .list-steps li span {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: var(--lav-bg);
    color: var(--muted);
    display: grid; place-items: center;
    font-size: 12px; font-weight: 700;
  }
  .list-steps li.is-on { background: var(--lav-soft); color: var(--purple); }
  .list-steps li.is-on span { background: var(--purple); color: #fff; }
  .list-steps li.is-done { color: var(--navy); }
  .list-steps li.is-done span { background: #E8F8EF; color: #1E9B5C; }
  .list-main {
    background: #fff;
    border-radius: 22px;
    padding: 36px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
  }
  .list-main h1 { font-size: 30px; font-weight: 800; margin: 8px 0 24px; letter-spacing: -0.02em; }

  .type-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .type-pick {
    padding: 22px 18px;
    border: 2px solid var(--border);
    background: #fff;
    border-radius: 18px;
    text-align: left;
    color: var(--navy);
    transition: border-color .15s, box-shadow .15s, transform .15s;
  }
  .type-pick:hover { transform: translateY(-2px); }
  .type-pick svg { color: var(--purple); }
  .type-pick strong { display: block; font-size: 16px; margin: 12px 0 4px; }
  .type-pick span { display: block; font-size: 13px; color: var(--muted); }
  .type-pick.is-on { border-color: var(--purple); box-shadow: 0 12px 28px rgba(79,54,232,0.14); }

  .map-preview { margin-top: 18px; border-radius: 18px; overflow: hidden; position: relative; }
  .map-preview svg { width: 100%; height: 240px; display: block; }
  .map-hint { position: absolute; left: 16px; bottom: 16px; padding: 8px 14px; background: rgba(255,255,255,0.95); border-radius: 10px; font-size: 12px; font-weight: 600; }

  .space-row { display: flex; flex-direction: column; gap: 4px; }
  .counter-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 0;
    border-bottom: 1px solid var(--border);
  }
  .counter-row strong { display: block; font-size: 16px; }
  .counter-row .muted { font-size: 13px; }
  .counter { display: inline-flex; align-items: center; gap: 14px; }
  .counter button { width: 36px; height: 36px; border-radius: 50%; background: var(--lav-bg); color: var(--navy); font-size: 18px; font-weight: 700; transition: background .15s; }
  .counter button:hover { background: var(--lav-soft); }
  .counter strong { font-size: 17px; min-width: 24px; text-align: center; }

  .chip-row.big { gap: 10px; }
  .chip-row.big .chip { padding: 12px 18px; font-size: 14px; }

  .photo-uploader { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
  .photo-tile { position: relative; border-radius: 14px; overflow: hidden; aspect-ratio: 4/3; }
  .photo-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .photo-cover { position: absolute; top: 10px; left: 10px; background: var(--navy); color: #fff; padding: 5px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; }
  .photo-upload {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    aspect-ratio: 4/3;
    border: 2px dashed var(--border);
    border-radius: 14px;
    color: var(--muted);
    font-weight: 600;
    transition: border-color .15s, color .15s;
  }
  .photo-upload span { font-size: 28px; margin-bottom: 4px; }
  .photo-upload:hover { border-color: var(--purple); color: var(--purple); }

  .price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 18px; }
  .price-card { padding: 18px; background: #FAFAFD; border-radius: 14px; }
  .price-card .small { font-size: 12px; }
  .price-input { display: flex; align-items: baseline; gap: 6px; margin-top: 6px; }
  .price-input input { width: 100%; border: none; background: none; font: inherit; font-size: 24px; font-weight: 800; color: var(--navy); outline: none; }
  .price-input span { font-size: 14px; font-weight: 700; color: var(--muted); }
  .pricing-tip { margin-top: 18px; padding: 14px 18px; background: linear-gradient(135deg, #FFE0EC, #F1EFFF); border-radius: 12px; font-size: 14px; color: var(--navy); }

  .review-summary .rev-preview { display: grid; grid-template-columns: 220px 1fr; gap: 22px; align-items: start; padding: 22px; background: #FAFAFD; border-radius: 18px; }
  .rev-preview img { width: 220px; height: 180px; border-radius: 14px; object-fit: cover; }
  .rev-preview strong { display: block; font-size: 22px; margin: 6px 0; font-weight: 800; }
  .rev-preview .muted { font-size: 13px; margin: 4px 0 10px; }
  .rev-preview p { font-size: 14px; color: #3F4163; line-height: 1.55; margin: 0 0 14px; text-wrap: pretty; }
  .amen-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
  .rev-price { font-size: 18px; color: var(--navy); }
  .rev-price strong { display: inline; font-size: 24px; font-weight: 800; }

  .list-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--border); }
  `;
  const s = document.createElement('style');
  s.id = 'host-dash-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { HostDashboard, ListPropertyPage });
