// Host / Sell / Rent landing page

const HostPage = ({ setView }) => {
  const [income, setIncome] = React.useState(1450);
  const [nights, setNights] = React.useState(18);
  const projected = income * nights;

  return (
    <main className="host">
      <section className="host-hero">
        <div className="host-hero-text">
          <span className="cta-eyebrow">LIST YOUR PROPERTY</span>
          <h1>Earn from your home, the <span className="grad-text">Jumeira</span> way.</h1>
          <p>Reach premium guests looking for villas, apartments, hotels, and unique stays. Our concierge team handles the details — so you don't have to.</p>
          <div className="host-cta-row">
            <button className="cta-pill" onClick={() => setView('login')}>Start listing <IconArrowRight size={16} stroke={2} /></button>
            <button className="ghost-btn-dark">Talk to an advisor</button>
          </div>
          <div className="stat-row">
            <div><strong>$2.4B</strong><span>Paid to hosts in 2025</span></div>
            <div><strong>62 cities</strong><span>Active markets globally</span></div>
            <div><strong>4.9 / 5</strong><span>Avg. host rating</span></div>
          </div>
        </div>
        <div className="host-hero-art">
          <img src={PHOTOS.villa1} alt="" />
          <div className="float-card">
            <div className="float-card-head">
              <span className="dot-live" /> Booking confirmed
            </div>
            <strong>5 nights · Jumeirah villa</strong>
            <div className="muted">Net earnings · 7,250 USD</div>
          </div>
        </div>
      </section>

      <section className="host-sec">
        <h2>How it works</h2>
        <div className="how-grid">
          {[
            { n: '01', title: 'Submit your home', body: 'Tell us about your property. Photos optional — our team can produce them.' },
            { n: '02', title: 'Get a curation review', body: 'A real human curator confirms fit, pricing, and presentation in 48 hours.' },
            { n: '03', title: 'Go live', body: 'Your listing reaches premium guests across 62 markets, instantly.' },
            { n: '04', title: 'Earn, hands off', body: 'We handle the bookings, the keys, the cleaning, the reviews. You collect.' },
          ].map(s => (
            <div className="how-card" key={s.n}>
              <span className="how-n">{s.n}</span>
              <strong>{s.title}</strong>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="host-sec">
        <div className="calc">
          <div>
            <span className="cta-eyebrow">EARNINGS CALCULATOR</span>
            <h2>You could earn around</h2>
            <div className="calc-result">
              <strong>{projected.toLocaleString()}</strong>
              <span>USD / month</span>
            </div>
            <p className="muted">Based on your inputs and average performance for similar Jumeirah villas.</p>
          </div>
          <div className="calc-controls">
            <div className="calc-row">
              <div className="calc-label">
                <span>Average nightly rate</span>
                <strong>{income.toLocaleString()} USD</strong>
              </div>
              <input type="range" min="300" max="3500" step="50" value={income} onChange={e => setIncome(parseInt(e.target.value, 10))} />
            </div>
            <div className="calc-row">
              <div className="calc-label">
                <span>Booked nights / month</span>
                <strong>{nights}</strong>
              </div>
              <input type="range" min="2" max="28" step="1" value={nights} onChange={e => setNights(parseInt(e.target.value, 10))} />
            </div>
            <button className="cta-pill" onClick={() => setView('login')}>List my property <IconArrowRight size={16} stroke={2} /></button>
          </div>
        </div>
      </section>

      <section className="host-sec">
        <h2>What kind of place do you have?</h2>
        <div className="type-grid">
          {[
            { id: 'villa', label: 'Villa', Icon: IconVilla },
            { id: 'house', label: 'House', Icon: IconHouse },
            { id: 'hotel', label: 'Hotel', Icon: IconHotel },
            { id: 'apt', label: 'Apartment', Icon: IconApartment },
            { id: 'camp', label: 'Camp House', Icon: IconCamp },
          ].map(t => (
            <button key={t.id} className="type-card">
              <span><t.Icon size={28} stroke={1.7} /></span>
              <strong>{t.label}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="host-sec">
        <h2>Built for high-end hosts</h2>
        <div className="benefit-grid">
          {[
            { title: 'Editorial photography', body: 'On-house photographers create the gallery that books the stay.' },
            { title: 'Smart, soft pricing', body: 'Algorithmic nightly rates tuned to your taste — never below your floor.' },
            { title: 'Concierge ops', body: 'Cleaning, key handover, supply runs, and guest support — managed.' },
            { title: 'Damage protection', body: 'Up to $3M protection on every booking. Verified guests only.' },
          ].map((b, i) => (
            <div key={i} className="benefit-card">
              <span className="b-num">{(i + 1).toString().padStart(2, '0')}</span>
              <div>
                <strong>{b.title}</strong>
                <p>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

(() => {
  if (document.getElementById('host-styles')) return;
  const css = `
  .host { max-width: 1440px; margin: 0 auto; padding: 0 52px 80px; }

  .host-hero {
    display: grid; grid-template-columns: 1.1fr 1fr;
    gap: 48px;
    align-items: center;
    padding: 56px 0 36px;
  }
  .host-hero-text h1 {
    font-size: 60px; font-weight: 900;
    line-height: 1.04;
    letter-spacing: -0.03em;
    margin: 14px 0 18px;
    text-wrap: balance;
  }
  .host-hero-text p {
    color: #3F4163;
    font-size: 17px; line-height: 1.55;
    max-width: 520px;
    text-wrap: pretty;
  }
  .host-cta-row { display: flex; gap: 12px; margin: 30px 0; }
  .ghost-btn-dark {
    padding: 14px 22px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 14px; font-weight: 700;
    color: var(--navy);
    transition: background .15s, border-color .15s;
  }
  .ghost-btn-dark:hover { background: var(--lav-bg); border-color: #D6D5EA; }
  .stat-row {
    display: flex; gap: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }
  .stat-row > div strong {
    display: block;
    font-size: 28px; font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--navy);
  }
  .stat-row > div span { font-size: 13px; color: var(--muted); }

  .host-hero-art {
    position: relative;
    border-radius: 28px;
    overflow: hidden;
    height: 540px;
    box-shadow: var(--shadow-card-hover);
  }
  .host-hero-art img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .float-card {
    position: absolute;
    left: 24px; bottom: 24px;
    background: #fff;
    padding: 18px 22px;
    border-radius: 18px;
    box-shadow: var(--shadow-card-hover);
    min-width: 260px;
  }
  .float-card-head {
    display: inline-flex; align-items: center; gap: 8px;
    color: #1E9B5C; font-size: 12px; font-weight: 700;
    letter-spacing: 0.04em;
    margin-bottom: 8px;
  }
  .dot-live { width: 8px; height: 8px; border-radius: 50%; background: #1E9B5C; box-shadow: 0 0 0 4px rgba(30, 155, 92, 0.18); }
  .float-card strong { display: block; font-size: 15px; color: var(--navy); }
  .float-card .muted { font-size: 13px; margin-top: 2px; }

  .host-sec { padding: 60px 0; border-top: 1px solid var(--border); }
  .host-sec h2 {
    font-size: 32px; font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 30px;
    text-wrap: balance;
  }

  .how-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  .how-card {
    background: #fff;
    border-radius: 20px;
    padding: 26px;
    box-shadow: var(--shadow-card);
  }
  .how-n {
    display: inline-block;
    font-size: 13px; font-weight: 800;
    letter-spacing: 0.06em;
    color: var(--purple);
    background: var(--lav-soft);
    padding: 6px 12px;
    border-radius: 999px;
    margin-bottom: 16px;
  }
  .how-card strong { display: block; font-size: 17px; margin-bottom: 6px; }
  .how-card p { color: var(--muted); font-size: 14px; line-height: 1.55; margin: 0; text-wrap: pretty; }

  .calc {
    background: #fff;
    border-radius: 28px;
    padding: 48px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px;
    box-shadow: var(--shadow-card-hover);
  }
  .calc h2 { margin: 12px 0 18px; }
  .calc-result {
    display: flex; align-items: baseline; gap: 10px;
    margin: 4px 0 14px;
  }
  .calc-result strong {
    font-size: 64px; font-weight: 900;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #4F36E8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .calc-result span { font-size: 17px; font-weight: 600; color: var(--navy); }
  .calc-controls { display: flex; flex-direction: column; gap: 24px; justify-content: center; }
  .calc-row { display: flex; flex-direction: column; gap: 12px; }
  .calc-label { display: flex; justify-content: space-between; align-items: center; }
  .calc-label span { font-size: 13px; font-weight: 600; color: var(--muted); }
  .calc-label strong { font-size: 17px; font-weight: 800; color: var(--navy); }
  .calc-row input[type="range"] {
    appearance: none;
    height: 6px;
    background: linear-gradient(90deg, #FF5B6E, #EA3FA2 50%, #4F36E8);
    border-radius: 999px;
    outline: none;
  }
  .calc-row input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 22px; height: 22px;
    background: #fff;
    border: 3px solid var(--purple);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(79, 54, 232, 0.3);
  }
  .calc-row input[type="range"]::-moz-range-thumb {
    width: 22px; height: 22px;
    background: #fff;
    border: 3px solid var(--purple);
    border-radius: 50%;
    cursor: pointer;
  }

  .type-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .type-card {
    background: #fff;
    border-radius: 18px;
    padding: 26px 20px;
    text-align: left;
    box-shadow: var(--shadow-card);
    transition: transform .2s, box-shadow .2s, border-color .2s;
    border: 1px solid transparent;
    display: flex; flex-direction: column; gap: 12px;
  }
  .type-card:hover { transform: translateY(-3px); border-color: var(--purple); box-shadow: 0 18px 40px rgba(79,54,232,0.14); }
  .type-card span {
    width: 52px; height: 52px;
    background: var(--lav-soft);
    color: var(--purple);
    border-radius: 14px;
    display: grid; place-items: center;
  }
  .type-card strong { font-size: 17px; }

  .benefit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .benefit-card {
    background: #fff;
    border-radius: 22px;
    padding: 30px;
    display: flex; gap: 22px;
    box-shadow: var(--shadow-card);
  }
  .b-num {
    flex: 0 0 auto;
    font-size: 26px; font-weight: 800;
    color: var(--pink);
    letter-spacing: -0.02em;
  }
  .benefit-card strong { display: block; font-size: 18px; margin-bottom: 6px; }
  .benefit-card p { color: var(--muted); font-size: 14px; line-height: 1.55; margin: 0; text-wrap: pretty; }
  `;
  const s = document.createElement('style');
  s.id = 'host-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { HostPage });
