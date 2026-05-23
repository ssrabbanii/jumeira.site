// Checkout flow — 3 steps: review, payment, confirmation
// + Confirmation page is shown when status === 'done'

const CheckoutPage = ({ property, setView, goToTrips }) => {
  const p = property || PROPERTIES[0];
  const [step, setStep] = React.useState(1); // 1 review, 2 payment, 3 confirmed
  const [contact, setContact] = React.useState({ name: 'Sienna Rivera', email: 'sienna@example.com', phone: '+971 50 234 1188' });
  const [card, setCard] = React.useState({ number: '4242 4242 4242 4242', exp: '12 / 28', cvc: '•••', name: 'Sienna Rivera', zip: '00000' });
  const [pay, setPay] = React.useState('card'); // card | apple | klarna
  const [note, setNote] = React.useState('Hi Layla — we will arrive around 4pm. So excited!');
  const [trip, setTrip] = React.useState({ nights: 5, guests: 4, checkin: 'Jun 12, 2026', checkout: 'Jun 17, 2026' });

  const nightly = parseInt(p.priceFrom.replace(/\./g, '').replace(/,/g, ''), 10) || 1200;
  const subtotal = nightly * trip.nights;
  const cleaning = 180;
  const serviceFee = Math.round(subtotal * 0.07);
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + cleaning + serviceFee + taxes;

  const reservationId = 'JM-' + (Math.floor(Math.random() * 900000) + 100000);

  if (step === 3) {
    return (
      <main className="checkout confirmation">
        <div className="conf-card">
          <div className="conf-burst">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="36" fill="url(#confg)" />
              <path d="M24 42 l12 12 l22 -24" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <defs>
                <linearGradient id="confg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#FF5B6E" />
                  <stop offset="0.6" stopColor="#EA3FA2" />
                  <stop offset="1" stopColor="#4F36E8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1>You're going to Jumeirah.</h1>
          <p className="muted">Your reservation is confirmed. Layla, your host, will be in touch within 24 hours.</p>
          <div className="conf-summary">
            <img src={p.img} alt="" onError={onImgError} />
            <div>
              <span className="prop-label">VILLA · CONFIRMATION {reservationId}</span>
              <strong>{p.title}</strong>
              <div className="muted">{trip.checkin} → {trip.checkout} · {trip.guests} guests · {trip.nights} nights</div>
              <div className="conf-total">Total charged · <strong>{total.toLocaleString()} USD</strong></div>
            </div>
          </div>
          <div className="conf-next">
            <h3>What happens next</h3>
            <ol>
              <li><strong>Confirmation email</strong> on its way to {contact.email}.</li>
              <li><strong>Host introduction</strong> within 24 hours, including the welcome guide.</li>
              <li><strong>Concierge greeting</strong> on arrival day, with a chilled welcome basket.</li>
            </ol>
          </div>
          <div className="conf-actions">
            <button className="cta-pill" onClick={goToTrips}>View my trips <IconArrowRight size={16} stroke={2} /></button>
            <button className="ghost-btn" onClick={() => setView('listing')}>Keep browsing</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <button className="back-btn" onClick={() => setView('detail')}>← Back to listing</button>
      <div className="checkout-grid">
        <div className="checkout-main">
          <h1>Confirm and pay</h1>

          <ol className="stepper">
            <li className={step >= 1 ? 'is-on' : ''}><span>1</span> Trip details</li>
            <li className={step >= 2 ? 'is-on' : ''}><span>2</span> Payment</li>
            <li className={step >= 3 ? 'is-on' : ''}><span>3</span> Confirmed</li>
          </ol>

          {step === 1 && (
            <>
              <section className="co-section">
                <h2>Your trip</h2>
                <div className="trip-row">
                  <div className="trip-cell">
                    <span>Dates</span>
                    <div className="cell-val"><IconCalendar size={16} stroke={1.8} /> {trip.checkin} → {trip.checkout}</div>
                  </div>
                  <button className="text-link" onClick={() => setTrip({ ...trip, nights: trip.nights + 1, checkout: 'Jun ' + (12 + trip.nights + 1) + ', 2026' })}>+ 1 night</button>
                </div>
                <div className="trip-row">
                  <div className="trip-cell">
                    <span>Guests</span>
                    <div className="cell-val"><IconUsers size={16} stroke={1.8} /> {trip.guests} guests</div>
                  </div>
                  <div className="stepper-mini">
                    <button onClick={() => setTrip({ ...trip, guests: Math.max(1, trip.guests - 1) })}>−</button>
                    <button onClick={() => setTrip({ ...trip, guests: Math.min(12, trip.guests + 1) })}>+</button>
                  </div>
                </div>
              </section>

              <section className="co-section">
                <h2>Who's coming</h2>
                <div className="form-grid">
                  <label className="form-field">
                    <span>Full name</span>
                    <input value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} />
                  </label>
                  <label className="form-field">
                    <span>Phone</span>
                    <input value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
                  </label>
                  <label className="form-field full">
                    <span>Email</span>
                    <input value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
                  </label>
                </div>
              </section>

              <section className="co-section">
                <h2>Message your host</h2>
                <textarea
                  className="msg-input"
                  rows={4}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Hi Layla — looking forward to staying!"
                />
              </section>

              <section className="co-section">
                <h2>Cancellation policy</h2>
                <p className="muted">
                  <strong style={{ color: '#060627' }}>Free cancellation until Jun 10.</strong> After that, cancel before check-in for a partial refund.
                </p>
              </section>

              <button className="cta-pill big" onClick={() => setStep(2)}>Continue to payment <IconArrowRight size={16} stroke={2} /></button>
            </>
          )}

          {step === 2 && (
            <>
              <section className="co-section">
                <h2>How you'll pay</h2>
                <div className="pay-tabs">
                  {[
                    { id: 'card', label: 'Credit card', sub: 'Visa, Mastercard, Amex' },
                    { id: 'apple', label: 'Apple Pay', sub: 'Touch ID to confirm' },
                    { id: 'klarna', label: 'Pay in 4', sub: '0% interest · split over 6 weeks' },
                  ].map(o => (
                    <button key={o.id} className={`pay-tab ${pay === o.id ? 'is-on' : ''}`} onClick={() => setPay(o.id)}>
                      <strong>{o.label}</strong>
                      <span>{o.sub}</span>
                    </button>
                  ))}
                </div>
              </section>

              {pay === 'card' && (
                <section className="co-section">
                  <h2>Card details</h2>
                  <div className="card-vis">
                    <div className="card-vis-band" />
                    <div className="card-vis-num">{card.number}</div>
                    <div className="card-vis-foot">
                      <div>
                        <span>CARDHOLDER</span>
                        <strong>{card.name}</strong>
                      </div>
                      <div>
                        <span>EXP</span>
                        <strong>{card.exp}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="form-grid">
                    <label className="form-field full">
                      <span>Card number</span>
                      <input value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                    </label>
                    <label className="form-field">
                      <span>Expiry</span>
                      <input value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} />
                    </label>
                    <label className="form-field">
                      <span>CVC</span>
                      <input value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value })} />
                    </label>
                    <label className="form-field full">
                      <span>Name on card</span>
                      <input value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                    </label>
                  </div>
                </section>
              )}
              {pay === 'apple' && (
                <section className="co-section pay-alt">
                  <div className="apple-pay-pill">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 1c.1 1.1-.4 2.2-1.1 3-.7.8-1.9 1.4-3 1.3-.1-1.1.4-2.1 1.1-2.9.7-.8 2-1.4 3-1.4zm3.8 17.4c-.5 1.1-.7 1.6-1.4 2.6-1 1.4-2.4 3.1-4.1 3.1-1.5 0-1.9-1-4-1-2 0-2.4 1-3.9 1-1.7 0-3-1.5-4-2.9-2.8-3.9-3.1-8.5-1.4-11C2.8 8.4 4.9 7.3 6.8 7.3c2 0 3.2 1.1 4.8 1.1 1.5 0 2.5-1.1 4.7-1.1 1.7 0 3.5.9 4.8 2.5-4.2 2.3-3.5 8.3.2 8.6z"/></svg>
                    Confirm with Touch ID
                  </div>
                  <p className="muted">A simulated Apple Pay prompt for the prototype.</p>
                </section>
              )}
              {pay === 'klarna' && (
                <section className="co-section pay-alt">
                  <h3>Split into 4 payments of {(total / 4).toFixed(0)} USD</h3>
                  <div className="klarna-rail">
                    {[0, 1, 2, 3].map(i => (
                      <div className="kl-step" key={i}>
                        <strong>{i === 0 ? 'Today' : `Week ${i * 2}`}</strong>
                        <span>{(total / 4).toFixed(0)} USD</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="co-section">
                <label className="check-row">
                  <input type="checkbox" defaultChecked />
                  <span>Save card for future stays</span>
                </label>
                <label className="check-row">
                  <input type="checkbox" defaultChecked />
                  <span>I agree to the rental terms and cancellation policy</span>
                </label>
              </section>

              <div className="co-actions">
                <button className="ghost-btn" onClick={() => setStep(1)}>← Back</button>
                <button className="cta-pill big" onClick={() => setStep(3)}>Confirm and pay {total.toLocaleString()} USD</button>
              </div>
            </>
          )}
        </div>

        <aside className="checkout-side">
          <div className="side-card">
            <div className="side-head">
              <img src={p.img} alt="" onError={onImgError} />
              <div>
                <span className="prop-label">VILLA</span>
                <strong>{p.title}</strong>
                <div className="muted small">
                  <Stars rating={p.rating} size={12} /> {p.rating.toFixed(1)}
                </div>
              </div>
            </div>
            <div className="side-rows">
              <div><span>{nightly.toLocaleString()} USD × {trip.nights} nights</span><span>{subtotal.toLocaleString()} USD</span></div>
              <div><span>Cleaning fee</span><span>{cleaning} USD</span></div>
              <div><span>Service fee</span><span>{serviceFee.toLocaleString()} USD</span></div>
              <div><span>Tourism tax</span><span>{taxes.toLocaleString()} USD</span></div>
            </div>
            <div className="side-total"><span>Total · USD</span><strong>{total.toLocaleString()}</strong></div>
            <div className="side-trust">
              <span className="trust-pill">Free cancellation · 48 h</span>
              <span className="trust-pill">Protected by Jumeira Trust</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

(() => {
  if (document.getElementById('checkout-styles')) return;
  const css = `
  .checkout { max-width: 1240px; margin: 0 auto; padding: 28px 52px 80px; }
  .checkout h1 { font-size: 34px; font-weight: 800; letter-spacing: -0.02em; margin: 18px 0 22px; }
  .checkout h2 { font-size: 18px; font-weight: 800; margin: 0 0 14px; }
  .stepper {
    display: flex; gap: 12px;
    padding: 0; list-style: none;
    margin: 0 0 28px;
  }
  .stepper li {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 14px 8px 8px;
    background: var(--lav-bg);
    color: var(--muted);
    border-radius: 999px;
    font-size: 13px; font-weight: 600;
  }
  .stepper li span {
    width: 24px; height: 24px;
    background: #fff; color: var(--muted);
    border-radius: 50%;
    display: grid; place-items: center;
    font-size: 12px; font-weight: 800;
  }
  .stepper li.is-on { background: var(--navy); color: #fff; }
  .stepper li.is-on span { background: #D9FF3F; color: var(--navy); }

  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 56px;
  }
  .checkout-main { min-width: 0; }
  .co-section { padding: 22px 0; border-bottom: 1px solid var(--border); }
  .co-section:last-of-type { border-bottom: none; }

  .trip-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 0;
  }
  .trip-cell span {
    display: block; font-size: 12px; font-weight: 700; color: var(--muted); letter-spacing: 0.04em; text-transform: uppercase;
    margin-bottom: 4px;
  }
  .cell-val { font-size: 15px; font-weight: 600; display: inline-flex; gap: 8px; align-items: center; }
  .stepper-mini { display: flex; gap: 8px; }
  .stepper-mini button {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--lav-bg);
    color: var(--navy);
    font-size: 18px; font-weight: 700;
    transition: background .15s;
  }
  .stepper-mini button:hover { background: var(--lav-soft); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-grid .form-field.full { grid-column: 1 / -1; }
  .msg-input {
    width: 100%;
    background: var(--search-bg);
    border: 1px solid transparent;
    border-radius: 14px;
    padding: 14px 18px;
    font-family: inherit; font-size: 15px;
    color: var(--navy);
    resize: vertical;
    outline: none;
  }
  .msg-input:focus { background: #fff; border-color: var(--purple); }

  .cta-pill.big {
    padding: 16px 28px;
    font-size: 15px;
    margin-top: 18px;
    display: inline-flex; align-items: center; gap: 8px;
  }

  .pay-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .pay-tab {
    padding: 18px 18px;
    border-radius: 16px;
    border: 1.5px solid var(--border);
    background: #fff;
    text-align: left;
    transition: border-color .15s, box-shadow .15s, transform .15s;
  }
  .pay-tab strong { display: block; font-size: 15px; }
  .pay-tab span { font-size: 13px; color: var(--muted); }
  .pay-tab.is-on { border-color: var(--purple); box-shadow: 0 12px 28px rgba(79,54,232,0.14); }

  .card-vis {
    background: linear-gradient(135deg, #060627 0%, #1F1466 60%, #4F36E8);
    border-radius: 20px;
    padding: 22px;
    color: #fff;
    margin-bottom: 18px;
    max-width: 380px;
    height: 200px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .card-vis::after {
    content: ''; position: absolute; right: -40px; top: -40px;
    width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(255,91,110,0.6), transparent 70%);
  }
  .card-vis-band { width: 40px; height: 32px; background: linear-gradient(135deg, #FFC44D, #E58E15); border-radius: 6px; }
  .card-vis-num { font-size: 22px; font-weight: 700; letter-spacing: 0.08em; font-family: 'SF Mono', Menlo, monospace; }
  .card-vis-foot { display: flex; gap: 28px; }
  .card-vis-foot span { display: block; font-size: 10px; opacity: 0.7; letter-spacing: 0.1em; }
  .card-vis-foot strong { font-size: 14px; font-weight: 700; }

  .pay-alt { text-align: center; padding: 36px 22px; }
  .apple-pay-pill {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 28px;
    background: #000; color: #fff;
    border-radius: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .klarna-rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 18px; }
  .kl-step { padding: 16px; background: var(--lav-bg); border-radius: 12px; }
  .kl-step strong { display: block; font-size: 13px; margin-bottom: 4px; }
  .kl-step span { font-size: 18px; font-weight: 800; }

  .co-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 18px; }

  /* Side */
  .side-card {
    background: #fff;
    border-radius: 22px;
    padding: 22px;
    box-shadow: var(--shadow-card-hover);
    position: sticky;
    top: 120px;
    border: 1px solid var(--border);
  }
  .side-head { display: flex; gap: 14px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
  .side-head img { width: 84px; height: 84px; border-radius: 14px; object-fit: cover; }
  .side-head .prop-label { font-size: 11px; }
  .side-head strong { display: block; font-size: 14px; line-height: 1.35; margin-top: 4px; }
  .side-head .small { font-size: 12px; display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; }
  .side-rows { display: flex; flex-direction: column; gap: 10px; padding: 18px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
  .side-rows > div { display: flex; justify-content: space-between; color: var(--navy); }
  .side-rows > div span:first-child { color: #555776; }
  .side-total { display: flex; justify-content: space-between; align-items: baseline; padding-top: 16px; font-weight: 700; }
  .side-total strong { font-size: 22px; font-weight: 800; }
  .side-trust { display: flex; flex-direction: column; gap: 6px; margin-top: 16px; }
  .trust-pill {
    background: var(--lav-bg);
    color: var(--navy);
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 12px; font-weight: 600;
    text-align: center;
  }

  /* Confirmation */
  .confirmation { padding-top: 60px; }
  .conf-card {
    max-width: 720px;
    margin: 0 auto;
    background: #fff;
    border-radius: 28px;
    padding: 48px;
    box-shadow: var(--shadow-card-hover);
    border: 1px solid var(--border);
    text-align: center;
  }
  .conf-burst { margin-bottom: 18px; display: flex; justify-content: center; }
  .conf-card h1 { font-size: 38px; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.02em; }
  .conf-card .muted { font-size: 15px; max-width: 480px; margin: 0 auto 28px; text-wrap: pretty; }
  .conf-summary {
    display: flex; gap: 18px;
    background: var(--lav-bg);
    padding: 18px;
    border-radius: 18px;
    text-align: left;
    margin-bottom: 24px;
  }
  .conf-summary img { width: 100px; height: 100px; border-radius: 14px; object-fit: cover; }
  .conf-summary .prop-label { font-size: 11px; }
  .conf-summary strong { display: block; font-size: 16px; margin: 4px 0; }
  .conf-total { margin-top: 10px; font-size: 14px; color: var(--navy); }
  .conf-total strong { display: inline; font-size: 16px; font-weight: 800; }
  .conf-next { text-align: left; background: #FAFAFD; padding: 22px; border-radius: 16px; }
  .conf-next h3 { font-size: 15px; font-weight: 800; margin: 0 0 10px; }
  .conf-next ol { padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .conf-next ol li { font-size: 14px; color: #3F4163; }
  .conf-actions { display: flex; gap: 10px; justify-content: center; margin-top: 26px; }
  `;
  const s = document.createElement('style');
  s.id = 'checkout-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();

Object.assign(window, { CheckoutPage });
