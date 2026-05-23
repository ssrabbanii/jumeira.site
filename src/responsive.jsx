// Global responsive overrides — tablet (≤1100px) and mobile (≤760px).
// Loaded LAST so its rules win without needing !important.

(() => {
  if (document.getElementById('responsive-styles')) return;
  const css = `
  /* Desktop / mobile helpers */
  .mobile-only { display: none !important; }
  .desktop-only { display: inline-flex; }

  /* Icon button — used by mobile nav + drawer */
  .icon-btn {
    width: 40px; height: 40px;
    background: var(--lav-bg);
    color: var(--navy);
    border-radius: 12px;
    display: inline-grid; place-items: center;
    flex: 0 0 auto;
    transition: background .15s;
  }
  .icon-btn:hover { background: var(--lav-soft); }

  /* ───────── TABLET (≤1100px) ───────── */
  @media (max-width: 1100px) {
    .top-nav-inner { gap: 16px; padding: 0 24px; height: 84px; }
    .search-bar { flex: 0 1 280px; height: 48px; }
    .nav-links { gap: 18px; }
    .nav-link { font-size: 13px; }
    .currency span { display: none; }
    .login-btn { width: 110px; height: 50px; font-size: 13px; }
    .lang-pill { display: none !important; }

    .cat-nav { height: auto; }
    .cat-all { flex: 0 0 200px; padding: 16px 16px; font-size: 12px; border-radius: 0 22px 0 0; }
    .cat-all-icon { width: 32px; height: 32px; }
    .cat-item { padding: 0 10px; font-size: 13px; gap: 8px; }
    .loc-selector { flex: 0 0 220px; padding: 12px 18px; }

    .listing, .detail, .home, .host, .host-dash, .account, .checkout, .list-prop, .auth, .host-cta {
      padding-left: 24px; padding-right: 24px;
    }
    .top-nav-inner, .cat-nav, .footer-inner, .footer-foot {
      padding-left: 24px; padding-right: 24px;
    }

    .prop-grid:not(.is-list) { grid-template-columns: repeat(2, 1fr) !important; }
    .faq-grid { grid-template-columns: 1fr; }
    .editorial-grid { grid-template-columns: 1fr !important; }
    .dest-grid-expanded { grid-template-columns: repeat(2, 1fr) !important; }

    /* Home */
    .hero { margin: 20px 24px 0; min-height: auto; }
    .hero-inner { padding: 36px 36px 30px; }
    .hero h1 { font-size: 44px; }
    .hero-search { grid-template-columns: 1fr 1fr auto; gap: 6px; }
    .hero-search .hs-field:nth-child(3), .hero-search .hs-field:nth-child(4) { grid-column: span 1; }
    .cat-cards { grid-template-columns: repeat(3, 1fr); }
    .dest-grid, .dest-grid-expanded { grid-template-columns: repeat(3, 1fr); grid-template-rows: auto; }
    .dest-grid-expanded .dest-card.is-tall { grid-row: span 1; height: 220px; }
    .home-featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .editorial-grid { grid-template-columns: 1fr 1fr; }
    .testimonial-grid { grid-template-columns: 1fr 1fr; }
    .dest-card.is-tall { grid-row: span 2; }
    .why-grid { grid-template-columns: repeat(2, 1fr); }
    .host-cta { grid-template-columns: 1fr; padding: 40px; margin-left: 24px; margin-right: 24px; }
    .host-cta-art { height: 240px; }

    /* Detail */
    .detail-grid { grid-template-columns: 1fr; gap: 36px; }
    .booking-card { position: static; }
    .gallery { height: 380px; }
    .review-grid { grid-template-columns: 1fr; }

    /* Host */
    .host-hero { grid-template-columns: 1fr; gap: 36px; }
    .host-hero-art { height: 360px; }
    .host-hero-text h1 { font-size: 44px; }
    .stat-row { gap: 24px; flex-wrap: wrap; }
    .how-grid { grid-template-columns: repeat(2, 1fr); }
    .benefit-grid { grid-template-columns: 1fr; }
    .calc { grid-template-columns: 1fr; gap: 28px; padding: 32px; }
    .type-grid { grid-template-columns: repeat(3, 1fr); }

    /* Host dashboard */
    .kpi-row { grid-template-columns: repeat(2, 1fr); }
    .dash-grid { grid-template-columns: 1fr; }

    /* Account */
    .account-grid { grid-template-columns: 1fr; gap: 18px; }
    .acct-side { position: static; }
    .acct-side nav { flex-direction: row; flex-wrap: wrap; padding: 12px 0; gap: 6px; }
    .acct-side .acct-status, .acct-side .acct-user { /* keep */ }
    .info-grid { grid-template-columns: repeat(2, 1fr); }
    .stat-tiles { grid-template-columns: repeat(2, 1fr); }
    .wishlist-grid { grid-template-columns: repeat(2, 1fr); }
    .setting-grid { grid-template-columns: repeat(2, 1fr); }

    /* Checkout */
    .checkout-grid { grid-template-columns: 1fr; gap: 28px; }
    .side-card { position: static; }
    .pay-tabs { grid-template-columns: 1fr; }

    /* List property */
    .list-grid { grid-template-columns: 1fr; }
    .list-side { position: static; }
    .list-steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; }
    .price-grid { grid-template-columns: 1fr; }
    .type-cards { grid-template-columns: repeat(2, 1fr); }
    .photo-uploader { grid-template-columns: repeat(2, 1fr); }
    .rev-preview { grid-template-columns: 1fr; }
    .rev-preview img { width: 100%; height: 220px; }

    /* Login */
    .auth { grid-template-columns: 1fr; min-height: auto; }
    .auth-art { margin: 16px 24px; height: 220px; border-radius: 22px; }
    .auth-quote h2 { font-size: 18px; max-width: none; }
    .auth-form-wrap { padding: 24px; }
    .back-btn { top: 24px; left: 24px; }

    /* Footer */
    .footer-inner { grid-template-columns: 1fr; gap: 28px; }
    .footer-cols { grid-template-columns: repeat(2, 1fr); }
  }

  /* ───────── MOBILE (≤760px) ───────── */
  @media (max-width: 760px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: inline-flex !important; }

    .top-nav-inner {
      padding: 0 16px;
      height: 64px;
      gap: 8px;
    }
    .logo-text { font-size: 18px; }
    .logo-wrap { gap: 6px; }
    .logo-wrap svg { width: 32px; height: 32px; }

    .mobile-only.icon-btn { margin-left: 4px; }
    .mobile-actions {
      display: flex !important;
      gap: 8px;
      margin-left: auto;
    }

    /* Mobile search overlay */
    .mobile-search-overlay {
      position: fixed; inset: 0;
      background: #fff;
      z-index: 95;
      animation: msoIn .15s ease;
    }
    @keyframes msoIn { from { opacity: 0; } to { opacity: 1; } }
    .mobile-search-bar {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
    }
    .mobile-search-bar input {
      flex: 1; min-width: 0;
      border: none; outline: none;
      background: none;
      font-family: inherit;
      font-size: 16px;
      color: var(--navy);
    }
    .mobile-search-bar > button {
      font-size: 14px; font-weight: 700;
      color: var(--pink);
      padding: 6px 4px;
    }

    /* Mobile drawer */
    .mobile-scrim {
      position: fixed; inset: 0;
      background: rgba(7, 7, 43, 0.4);
      backdrop-filter: blur(4px);
      z-index: 96;
      animation: msoIn .2s ease;
    }
    .mobile-drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 86%; max-width: 340px;
      background: #fff;
      z-index: 97;
      display: flex; flex-direction: column;
      box-shadow: -20px 0 50px rgba(7, 7, 43, 0.18);
      animation: drIn .25s cubic-bezier(.22,.61,.36,1);
    }
    @keyframes drIn { from { transform: translateX(20px); opacity: 0; } to { transform: none; opacity: 1; } }
    .mobile-drawer > header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 18px 20px;
      border-bottom: 1px solid var(--border);
    }
    .mob-user {
      display: flex; gap: 12px; align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    .mob-user strong { display: block; font-size: 14px; }
    .mob-user span { display: block; font-size: 12px; color: var(--muted); }
    .mob-nav { flex: 1; overflow-y: auto; padding: 8px 12px; display: flex; flex-direction: column; gap: 2px; }
    .mob-label {
      font-size: 11px; font-weight: 800;
      color: var(--muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 18px 12px 6px;
    }
    .mob-nav > button {
      display: block;
      width: 100%;
      padding: 13px 14px;
      text-align: left;
      font-size: 15px; font-weight: 600;
      color: var(--navy);
      border-radius: 12px;
      transition: background .12s;
    }
    .mob-nav > button:hover { background: var(--lav-bg); }
    .mob-foot {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 20px;
      border-top: 1px solid var(--border);
    }
    .mob-foot .cta-pill, .mob-foot .ghost-btn { padding: 12px 22px; font-size: 13px; }

    /* Page padding */
    .listing, .detail, .home, .host, .host-dash, .account, .checkout, .list-prop, .auth, .host-cta {
      padding-left: 16px; padding-right: 16px;
    }
    .footer-inner, .footer-foot { padding-left: 16px; padding-right: 16px; }

    /* Category bar → mobile pills + bottom sheet (handled in header.jsx) */
    .cat-nav {
      height: auto;
      flex-direction: column;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      gap: 8px;
    }
    .cat-mobile {
      display: flex !important;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }
    .cat-pill {
      display: flex; align-items: center;
      gap: 12px;
      width: 100%;
      padding: 10px 14px 10px 10px;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 6px 20px rgba(12, 12, 40, 0.05);
      transition: border-color .15s, box-shadow .15s, transform .12s;
    }
    .cat-pill:active { transform: scale(0.99); }
    .cat-pill:hover, .cat-pill:focus-visible { border-color: var(--purple); box-shadow: 0 10px 28px rgba(79, 54, 232, 0.14); outline: none; }
    .cat-pill-icon {
      width: 40px; height: 40px;
      border-radius: 12px;
      flex: 0 0 auto;
      display: grid; place-items: center;
      color: #fff;
      background: linear-gradient(135deg, #FF5B6E, #EA3FA2 60%, #D931B8);
    }
    .cat-pill-icon.loc-icon {
      background: linear-gradient(135deg, #4F36E8, #2A1FA8);
    }
    .cat-pill-text {
      flex: 1; min-width: 0;
      text-align: left;
      display: flex; flex-direction: column;
    }
    .cat-pill-text small {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      line-height: 1;
    }
    .cat-pill-text strong {
      margin-top: 4px;
      font-size: 15px; font-weight: 700;
      color: var(--navy);
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Bottom sheet */
    .sheet-scrim {
      position: fixed; inset: 0;
      background: rgba(7, 7, 43, 0.4);
      backdrop-filter: blur(4px);
      z-index: 110;
      animation: msoIn .2s ease;
    }
    .sheet {
      position: fixed;
      left: 0; right: 0; bottom: 0;
      z-index: 111;
      background: #fff;
      border-radius: 22px 22px 0 0;
      max-height: 78vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 -20px 50px rgba(7, 7, 43, 0.2);
      animation: sheetUp .26s cubic-bezier(.22,.61,.36,1);
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
    @keyframes sheetUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    .sheet-handle {
      width: 44px; height: 4px;
      background: #D8D8E6;
      border-radius: 999px;
      margin: 10px auto 4px;
    }
    .sheet > header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 18px 14px;
      border-bottom: 1px solid var(--border);
    }
    .sheet > header h3 {
      margin: 0;
      font-size: 17px; font-weight: 800;
      color: var(--navy);
    }
    .sheet-list {
      list-style: none;
      margin: 0; padding: 6px;
      overflow-y: auto;
      flex: 1;
    }
    .sheet-row {
      display: flex; align-items: center;
      gap: 14px;
      width: 100%;
      padding: 14px 12px;
      border-radius: 14px;
      background: transparent;
      transition: background .12s;
      text-align: left;
    }
    .sheet-row:active { background: var(--lav-bg); }
    .sheet-row.is-on { background: var(--lav-soft); }
    .sheet-row-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: var(--lav-bg);
      color: var(--purple);
      display: grid; place-items: center;
      flex: 0 0 auto;
    }
    .sheet-row.is-on .sheet-row-icon { background: var(--purple); color: #fff; }
    .sheet-row-label { flex: 1; min-width: 0; }
    .sheet-row-label strong {
      display: block; font-size: 15px; font-weight: 700; color: var(--navy);
    }
    .sheet-row-label small {
      display: block; font-size: 13px; color: var(--muted);
      margin-top: 2px;
    }
    .sheet-check {
      width: 24px; height: 24px;
      border-radius: 50%;
      background: var(--purple);
      color: #fff;
      display: grid; place-items: center;
      flex: 0 0 auto;
    }

    /* Listing */
    .prop-grid:not(.is-list) { grid-template-columns: 1fr !important; gap: 16px; }
    .prop-grid.is-list { grid-template-columns: 1fr; gap: 12px; }
    .prop-card.is-list { grid-template-columns: 1fr; }
    .prop-card.is-list .prop-body { padding: 18px 20px; }
    .results-header { flex-direction: column; align-items: flex-start; gap: 14px; }
    .results-title { font-size: 24px; }
    .results-sub { font-size: 13px; }
    .results-controls { width: 100%; flex-wrap: wrap; }
    .filters-btn { flex: 1; min-width: 140px; height: 52px; width: auto; }
    .view-btn { width: 44px; height: 44px; }
    .listing-faq { margin-top: 40px; padding-top: 28px; }
    .listing-faq h2 { font-size: 22px; }
    .faq-card { padding: 18px; }
    .prop-card.is-list .prop-img-wrap { min-height: 200px; height: 200px; }
    .prop-excerpt { font-size: 12px; }
    .prop-amenity { font-size: 10px; padding: 3px 8px; }

    /* Hero */
    .hero { margin: 16px 16px 0; border-radius: 22px; }
    .hero-inner { padding: 28px 24px 28px; }
    .hero h1 { font-size: 34px; margin: 12px 0 10px; line-height: 1.1; }
    .hero-sub { font-size: 14px; }
    .hero-eyebrow { font-size: 11px; padding: 6px 12px; }
    .hero-search { display: flex; flex-direction: column; gap: 4px; padding: 8px; border-radius: 16px; margin-top: 18px; }
    .hero-search .hs-field { padding: 10px 14px; }
    .hs-cta { width: 100%; padding: 14px; justify-content: center; margin-top: 4px; }
    .hero-marquee { font-size: 12px; }
    .marquee-chip { padding: 6px 12px; font-size: 12px; }

    /* Home sections */
    .home-sec { padding: 40px 16px 0; }
    .home-sec h2 { font-size: 24px; }
    .sec-head { flex-direction: column; align-items: flex-start; gap: 8px; margin-bottom: 18px; }
    .cat-cards { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .home-featured-grid { grid-template-columns: 1fr !important; gap: 16px; }
    .cat-card { padding: 16px; }
    .cat-card-icon { width: 40px; height: 40px; margin-bottom: 4px; }
    .dest-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
    .dest-grid-expanded { grid-template-columns: 1fr !important; }
    .dest-card { height: 180px; }
    .dest-card.is-tall { grid-row: auto; height: 240px; }
    .dest-card .dest-desc { font-size: 12px; }
    .editorial-card { flex-direction: column !important; }
    .editorial-card img { width: 100% !important; height: 200px !important; }
    .testimonial-grid { grid-template-columns: 1fr !important; }
    .stats-bar { flex-direction: column; gap: 16px; text-align: center; }
    .why-grid { grid-template-columns: 1fr; gap: 12px; }
    .host-cta { padding: 32px 24px; margin: 40px 16px 0; }
    .host-cta h2 { font-size: 30px; }
    .host-cta-art { height: 200px; }

    /* Detail */
    .detail h1, .detail-head h1 { font-size: 26px !important; }
    .breadcrumb { font-size: 12px; flex-wrap: wrap; }
    .detail-head { flex-direction: column; align-items: flex-start; gap: 12px; }
    .detail-actions { width: 100%; }
    .gallery {
      display: flex !important;
      grid-template-columns: none !important;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 10px;
      height: auto;
      margin: 18px -16px 0;
      padding: 0 16px 8px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      position: relative;
    }
    .gallery::-webkit-scrollbar { display: none; }
    .gallery-main {
      flex: 0 0 88%;
      height: 280px;
      scroll-snap-align: center;
      border-radius: 18px;
      overflow: hidden;
    }
    .gallery-side {
      display: contents;
    }
    .gallery-tile {
      flex: 0 0 88%;
      height: 280px;
      scroll-snap-align: center;
      border-radius: 18px;
      overflow: hidden;
    }
    .gallery-tile img { transition: none; }
    .show-all {
      position: absolute;
      top: 12px; right: 28px;
      bottom: auto;
      padding: 7px 12px;
      font-size: 12px;
      z-index: 2;
    }
    .feature-row { grid-template-columns: 1fr; gap: 12px; }
    .amenities-grid { grid-template-columns: 1fr; }
    .review-grid { grid-template-columns: 1fr; }
    .map-art { height: 220px; }
    .host-row { flex-direction: column-reverse; align-items: flex-start; gap: 12px; }
    .booking-card { padding: 20px; }
    .reserve-btn { font-size: 15px; }

    /* Checkout */
    .checkout { padding: 16px; }
    .checkout h1 { font-size: 26px; }
    .stepper {
      display: flex !important;
      gap: 8px;
      overflow-x: auto;
      flex-wrap: nowrap !important;
      margin: 0 -16px 22px;
      padding: 0 16px 8px;
      scrollbar-width: none;
    }
    .stepper::-webkit-scrollbar { display: none; }
    .stepper li {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      flex-shrink: 0 !important;
      align-items: center;
      font-size: 13px;
      padding: 8px 14px 8px 6px;
      white-space: nowrap !important;
      gap: 6px;
      min-width: max-content;
      width: max-content;
    }
    .stepper li span {
      width: 24px; height: 24px;
      font-size: 11px;
      flex: 0 0 auto;
    }

    /* Filter drawer → full-width bottom-anchored sheet */
    .filter-drawer {
      width: 100% !important;
      max-width: 100vw !important;
      top: 0;
      max-height: 100vh;
      animation: drawerUp .28s cubic-bezier(.22,.61,.36,1);
    }
    @keyframes drawerUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: none; opacity: 1; }
    }
    .filter-drawer .drawer-head { padding: 22px 18px 14px; }
    .filter-drawer .drawer-head h2 { font-size: 20px; }
    .filter-drawer .drawer-body { padding: 12px 18px 24px; }
    .filter-drawer .drawer-body section { padding: 14px 0; }
    .filter-drawer .drawer-foot {
      padding: 14px 18px 18px;
      gap: 10px;
    }
    .filter-drawer .drawer-foot .cta-pill {
      flex: 1;
      text-align: center;
      padding: 14px 16px;
      font-size: 13px;
    }
    .filter-drawer .chip-row { flex-wrap: wrap; }
    .filter-drawer .chip { padding: 8px 14px; font-size: 13px; }
    .filter-drawer .num-btn { min-width: 48px; padding: 0 12px; }

    /* Trip detail rows on checkout */
    .trip-row {
      flex-wrap: wrap;
      gap: 10px;
    }
    .trip-row > .trip-cell { flex: 1 1 100%; }
    .trip-row > .text-link,
    .trip-row > .stepper-mini { margin-left: auto; }
    .trip-row .cell-val {
      flex-wrap: wrap;
      font-size: 14px;
    }
    .form-grid { grid-template-columns: 1fr; }
    .pay-tabs { grid-template-columns: 1fr; }
    .card-vis { max-width: 100%; height: 180px; padding: 18px; }
    .card-vis-num { font-size: 18px; letter-spacing: 0.06em; }
    .klarna-rail { grid-template-columns: repeat(2, 1fr); }
    .co-actions { flex-direction: column; align-items: stretch; gap: 8px; }
    .co-actions .cta-pill { width: 100%; justify-content: center; }
    .cta-pill.big { width: 100%; justify-content: center; padding: 14px 20px; font-size: 14px; }
    .conf-card { padding: 28px 22px; border-radius: 22px; }
    .conf-card h1 { font-size: 26px; }
    .conf-summary { flex-direction: column; }
    .conf-summary img { width: 100%; height: 180px; }
    .conf-actions { flex-direction: column; gap: 8px; }
    .conf-actions button { width: 100%; }

    /* Account */
    .acct-side { padding: 14px; }
    .acct-side nav { overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none; padding: 10px 0; gap: 4px; }
    .acct-side nav::-webkit-scrollbar { display: none; }
    .acct-nav { flex: 0 0 auto; padding: 10px 12px; font-size: 13px; }
    .acct-status { display: none; }
    .acct-panel { padding: 20px; border-radius: 18px; }
    .panel-head h2 { font-size: 20px; }
    .info-grid { grid-template-columns: 1fr; }
    .stat-tiles { grid-template-columns: repeat(2, 1fr); }
    .stat-tile strong { font-size: 22px; }
    .profile-id { flex-direction: column; align-items: flex-start; gap: 12px; margin-top: -40px; padding: 0 16px; }
    .big-avatar { width: 76px; height: 76px; font-size: 24px; }
    .trip-card { grid-template-columns: 1fr; padding: 14px; gap: 14px; }
    .trip-card img { width: 100%; height: 180px; }
    .trip-countdown { padding: 14px 20px; align-self: flex-start; }
    .wishlist-grid { grid-template-columns: 1fr; }
    .setting-grid { grid-template-columns: 1fr; }

    /* Inbox: show list OR thread, not both */
    .acct-panel.inbox { padding: 0; }
    .inbox-grid { grid-template-columns: 1fr; height: 580px; }
    .thread-list { border-right: none; border-bottom: 1px solid var(--border); }
    .thread-view .ghost-btn { display: none; }

    /* Host landing */
    .host-hero { grid-template-columns: 1fr; gap: 24px; padding: 36px 0 24px; }
    .host-hero-text h1 { font-size: 34px; }
    .host-hero-text p { font-size: 15px; }
    .host-hero-art { height: 280px; }
    .stat-row { gap: 16px; flex-wrap: wrap; padding-top: 18px; }
    .stat-row > div strong { font-size: 22px; }
    .host-sec h2 { font-size: 24px; }
    .how-grid { grid-template-columns: 1fr; }
    .how-card { padding: 22px; }
    .calc { grid-template-columns: 1fr; padding: 24px; border-radius: 22px; gap: 22px; }
    .calc-result strong { font-size: 44px; }
    .type-grid { grid-template-columns: repeat(2, 1fr); }
    .benefit-grid { grid-template-columns: 1fr; }
    .benefit-card { padding: 22px; gap: 14px; }

    /* Host dashboard */
    .dash-head { flex-direction: column; align-items: flex-start; gap: 16px; }
    .dash-head h1 { font-size: 24px; }
    .dash-actions { width: 100%; flex-wrap: wrap; }
    .dash-tabs { width: 100%; overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap; }
    .dash-tabs::-webkit-scrollbar { display: none; }
    .dash-tabs button { flex: 0 0 auto; }
    .kpi-row { grid-template-columns: 1fr; }
    .kpi > strong { font-size: 24px; }
    .host-listing { grid-template-columns: 1fr; gap: 14px; padding: 14px; }
    .host-listing img { width: 100%; height: 180px; }
    .hl-stats { gap: 18px; flex-wrap: wrap; }
    .hl-actions { width: 100%; }
    .hl-actions button { flex: 1; }
    .recent-card { padding: 18px; overflow-x: auto; }
    .recent-tbl { font-size: 12px; min-width: 540px; }
    .cal-card { padding: 16px; overflow-x: auto; }
    .cal-grid { min-width: 380px; }
    .review-grid { grid-template-columns: 1fr; }

    /* List property */
    .list-prop { padding: 16px; }
    .list-side { padding: 18px; }
    .list-steps { grid-template-columns: 1fr; }
    .list-main { padding: 22px 18px; }
    .list-main h1 { font-size: 24px; }
    .type-cards { grid-template-columns: 1fr; }
    .type-pick { padding: 18px; }
    .space-row .counter-row { flex-wrap: wrap; gap: 12px; }
    .price-grid { grid-template-columns: 1fr; }
    .photo-uploader { grid-template-columns: 1fr 1fr; }
    .rev-preview { grid-template-columns: 1fr; padding: 16px; }
    .rev-preview img { width: 100%; height: 200px; }
    .list-foot { flex-direction: column-reverse; gap: 10px; align-items: stretch; }
    .list-foot .cta-pill { width: 100%; justify-content: center; }

    /* Login */
    .auth-art { display: none; }
    .auth-form-wrap { padding: 24px 20px; min-height: calc(100vh - 64px); }
    .back-btn { top: 16px; left: 16px; }
    .auth-card h1 { font-size: 26px; }
    .oauth-row { grid-template-columns: 1fr; }
    .auth-tabs button { padding: 8px 16px; font-size: 12px; }

    /* Footer */
    .footer-inner { grid-template-columns: 1fr; gap: 24px; padding: 36px 16px 24px; }
    .footer-cols { grid-template-columns: 1fr 1fr; }
    .footer-foot { flex-direction: column; gap: 10px; padding: 18px 16px 24px; align-items: flex-start; }

    /* Disclaimer */
    .font-palette-scrim { padding: 16px; }
    .disc-card { padding: 28px 22px; max-width: none; }
    .disc-card h2 { font-size: 22px; }
    .disc-meta { grid-template-columns: 1fr; gap: 10px; }
    .disc-meta > div { flex-direction: row; justify-content: space-between; align-items: center; }
    .disc-actions .cta-pill { width: 100%; padding: 14px; }

    /* Tweaks panel — keep below mobile drawer */
    .twk-panel { right: 12px !important; bottom: 12px !important; max-width: calc(100vw - 24px); }

    /* Font palette hint */
    .font-hint { bottom: 16px; font-size: 12px; padding: 9px 14px; }

    /* Reduce reserved scroll-top for sticky nav */
    .booking-card, .acct-side, .side-card, .list-side {
      top: 88px;
    }
  }

  /* Extra small (≤420px) — tightest squeeze */
  @media (max-width: 420px) {
    .top-nav-inner { gap: 6px; padding: 0 14px; }
    .logo-text { font-size: 17px; }
    .hero h1 { font-size: 30px; }
    .home-sec h2, .host-sec h2, .results-title { font-size: 22px; }
    .footer-cols { grid-template-columns: 1fr; }
  }
  `;
  const s = document.createElement('style');
  s.id = 'responsive-styles';
  s.textContent = css;
  document.head.appendChild(s);
})();
