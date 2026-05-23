// Rich mock content — photos, properties, location copy, homepage data

// Verified Unsplash IDs only (broken photo IDs removed — many 1600xxx hashes 404)
const IMG = (id) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

const PHOTO_POOL = [
  IMG('photo-1613490493576-7fde63acd811'),
  IMG('photo-1600585154340-be6161a56a0c'),
  IMG('photo-1582268611958-ebfd161ef9cf'),
  IMG('photo-1512917774080-9991f1c4c750'),
  IMG('photo-1564013799919-ab600027ffc6'),
  IMG('photo-1600596542815-ffad4c1539a9'),
  IMG('photo-1613553474179-e1eda3ea5734'),
  IMG('photo-1570129477492-45c003edd2be'),
  IMG('photo-1600607687939-ce8a6c25118c'),
  IMG('photo-1600566753190-17f0baa2a6c3'),
  IMG('photo-1600585154526-990dced4db0d'),
  IMG('photo-1600047509807-ba8f99d2cdde'),
  IMG('photo-1600210492486-724fe5c67fb0'),
  IMG('photo-1600607687644-c7171b42498f'),
  IMG('photo-1600566753086-00f18fb6b3ea'),
  IMG('photo-1600585152915-d208bec867a1'),
  IMG('photo-1600607688969-a5bfcd646154'),
  IMG('photo-1600585154363-67eb9e2e2099'),
  IMG('photo-1600566752355-35792bedcfea'),
  IMG('photo-1600585153490-76fb20a32601'),
  IMG('photo-1613977257363-707ba9348227'),
  IMG('photo-1494526585095-c41746248156'),
  IMG('photo-1522708323590-d24dbb6b0267'),
  IMG('photo-1484154218962-a197022b5858'),
];

const FALLBACK_IMG = PHOTO_POOL[0];

const onImgError = (e) => {
  if (e.target.dataset.fallback) return;
  e.target.dataset.fallback = '1';
  e.target.src = FALLBACK_IMG;
};

const PHOTOS = PHOTO_POOL.reduce((acc, url, i) => {
  acc[`p${i + 1}`] = url;
  return acc;
}, {});
// Legacy keys used across detail, account, host flows
['villa1', 'villa2', 'villa3', 'villa4', 'villa5', 'villa6', 'villa7', 'villa8'].forEach((key, i) => {
  PHOTOS[key] = PHOTO_POOL[i % PHOTO_POOL.length];
});

const TITLE_PARTS = {
  villa: ['Beachfront Villa', 'Garden Pavilion', 'Coastal Retreat', 'Palm Estate', 'Infinity Pool Villa', 'Lagoon Villa', 'Sunset Villa', 'Private Beach Villa'],
  house: ['Family Townhouse', 'Courtyard Home', 'Garden House', 'Heritage Residence', 'Modern Maison', 'Seaside House', 'Terraced Home', 'Corner Residence'],
  hotel: ['Boutique Suite', 'Skyline Room', 'Ocean View Suite', 'Executive Room', 'Penthouse Suite', 'Designer Hotel Room', 'Club Level Suite', 'Wellness Suite'],
  apartment: ['Marina Apartment', 'Downtown Loft', 'Sky Residence', 'Waterfront Flat', 'Designer Apartment', 'Corner Penthouse', 'City View Flat', 'Terrace Apartment'],
  camp: ['Desert Camp', 'Beach Glamping', 'Dune Pavilion', 'Island Camp', 'Safari Tent', 'Coastal Camp', 'Luxury Tent', 'Outdoor Pavilion'],
};

const DESC_SNIPPETS = [
  'Floor-to-ceiling windows, bespoke interiors, and a dedicated concierge team from check-in to checkout.',
  'Steps from the waterfront with private outdoor space, premium linens, and a fully equipped chef\'s kitchen.',
  'Recently renovated with smart-home controls, Sonos sound, and a temperature-controlled wine display.',
  'Ideal for families and groups who want hotel-level service inside a private, architect-led home.',
  'Morning light pours across open-plan living — perfect for long brunches and sunset dinners outside.',
  'Includes daily housekeeping, high-speed fiber Wi‑Fi, and complimentary airport transfers on stays of 5+ nights.',
];

const AMENITY_SETS = [
  ['Private pool', 'Beach access', 'Chef kitchen'],
  ['Jacuzzi', 'Gym', 'Valet parking'],
  ['Balcony', 'Smart home', '24/7 security'],
  ['Garden', 'BBQ', 'Kids room'],
  ['Sea view', 'Butler', 'Spa bath'],
];

const BADGES = ['Guest favorite', 'Rare find', 'Instant book', 'Superhost', 'New listing', null, null];

const GUEST_OPTS = [2, 4, 6, 8, 10, 12];
const BED_OPTS = [1, 2, 3, 4, 5];

const LOCATIONS_LIST = ['jumeirah', 'palm', 'marina', 'downtown', 'abudhabi', 'maldives'];
const CATEGORIES_LIST = ['villa', 'house', 'hotel', 'apartment', 'camp'];

const buildProperties = () => {
  const items = [];
  let id = 1;
  LOCATIONS_LIST.forEach((locationId) => {
    CATEGORIES_LIST.forEach((category) => {
      const titles = TITLE_PARTS[category];
      for (let i = 0; i < 8; i++) {
        const guests = GUEST_OPTS[(id + i) % GUEST_OPTS.length];
        const beds = BED_OPTS[(id + i) % BED_OPTS.length];
        const price = (420 + ((id * 137) % 2400)).toLocaleString('en-US');
        const rating = 3.2 + ((id * 17) % 18) / 10;
        const badge = BADGES[id % BADGES.length];
        items.push({
          id: id++,
          img: PHOTO_POOL[(id + i) % PHOTO_POOL.length],
          category,
          locationId,
          label: CATEGORY_LABELS[category],
          title: `${titles[i % titles.length]} — ${getLocation(locationId).area}`,
          excerpt: DESC_SNIPPETS[(id + i) % DESC_SNIPPETS.length],
          meta: `${guests} guests · ${beds} bedroom${beds > 1 ? 's' : ''}`,
          amenities: AMENITY_SETS[(id + i) % AMENITY_SETS.length],
          priceFrom: price.replace(/,/g, '.'),
          rating: Math.min(5, Math.round(rating * 10) / 10),
          badge,
          reviews: 12 + ((id * 23) % 180),
        });
      }
    });
  });
  return items;
};

const PROPERTIES = buildProperties();

const LOCATION_GUIDES = {
  jumeirah: {
    headline: 'Jumeirah — quiet lanes, white sand, and iconic skyline views',
    body: 'From the kite beach stretch to the low-rise villas tucked behind La Mer, Jumeirah is where Dubai feels residential and relaxed. Expect palm-lined streets, boutique cafés, and easy access to both the coast and Downtown in under twenty minutes. Our curated homes here range from family townhouses with private gardens to beachfront villas with staff quarters and chef kitchens.',
    highlights: ['5 min to public beach', 'Family-friendly', 'Premium grocery & dining'],
    gallery: [PHOTO_POOL[0], PHOTO_POOL[2], PHOTO_POOL[8], PHOTO_POOL[14]],
  },
  palm: {
    headline: 'Palm Jumeirah — frond living on the Arabian Gulf',
    body: 'The Palm is synonymous with statement architecture: glass-fronted villas on the fronds, hotel-branded residences, and sunset decks over calm water. Whether you are celebrating a milestone or hosting a corporate retreat, listings here lean toward larger footprints, private pools, and marina access. Many homes include daily housekeeping and water-sports concierge.',
    highlights: ['Private beach clubs', 'Marina & yacht access', 'Iconic Atlantis views'],
    gallery: [PHOTO_POOL[1], PHOTO_POOL[5], PHOTO_POOL[11], PHOTO_POOL[19]],
  },
  marina: {
    headline: 'Dubai Marina — waterfront towers and vibrant nightlife',
    body: 'Walk the promenade, dine al fresco, and return to a high-floor apartment with floor-to-ceiling marina views. This district suits couples and business travelers who want energy on the doorstep: gyms, co-working lounges, and late-night dining within minutes. Our apartments and penthouses often include building pools, concierge, and covered parking.',
    highlights: ['Metro & tram nearby', 'Rooftop pools', 'Marina Walk dining'],
    gallery: [PHOTO_POOL[3], PHOTO_POOL[9], PHOTO_POOL[16], PHOTO_POOL[22]],
  },
  downtown: {
    headline: 'Downtown — Burj Khalifa, Dubai Mall, and city pulse',
    body: 'Stay in the heart of the city with direct access to the Dubai Fountain, Opera District, and world-class shopping. Downtown listings skew toward designer apartments and hotel residences with skyline terraces. Perfect for short luxury breaks, fashion week, or guests who want everything walkable.',
    highlights: ['Burj Khalifa district', 'Luxury retail', 'Fine dining cluster'],
    gallery: [PHOTO_POOL[4], PHOTO_POOL[10], PHOTO_POOL[17], PHOTO_POOL[23]],
  },
  abudhabi: {
    headline: 'Saadiyat Island — culture, beaches, and calm luxury',
    body: 'Abu Dhabi\'s cultural coast pairs museum architecture with powder-soft beaches. Villas and camp-style pavilions here emphasize space, privacy, and resort amenities — think golf courses, beach clubs, and Louvre-adjacent dining. A quieter counterpoint to Dubai with equally premium finishes.',
    highlights: ['Museum district', 'Championship golf', 'Protected beaches'],
    gallery: [PHOTO_POOL[6], PHOTO_POOL[12], PHOTO_POOL[20], PHOTO_POOL[22]],
  },
  maldives: {
    headline: 'Malé Atoll — overwater calm and barefoot luxury',
    body: 'Crystal lagoons, reef snorkeling, and villas that blur the line between indoors and the Indian Ocean. Our Maldives collection includes overwater suites, beach camps with plunge pools, and eco-luxury tents with private decks. Ideal for honeymoons, dive trips, and digital detox weeks.',
    highlights: ['House reef access', 'Spa & wellness', 'Sunset cruises'],
    gallery: [PHOTO_POOL[7], PHOTO_POOL[13], PHOTO_POOL[21], PHOTO_POOL[23]],
  },
};

const CATEGORY_BLURBS = {
  all: 'Browse every stay type in this area — villas with private pools, boutique hotel suites, family houses, skyline apartments, and one-of-a-kind outdoor camps.',
  villa: 'Standalone luxury homes with private outdoor space, often including pools, gardens, and dedicated staff. Perfect for families and groups who want privacy without sacrificing service.',
  house: 'Townhouses and detached homes in residential neighborhoods — more space, local character, and room to spread out for longer stays.',
  hotel: 'Boutique and branded hotel rooms with daily housekeeping, room service, and building amenities like gyms and pools.',
  apartment: 'High-rise residences with marina or skyline views, building security, and the convenience of urban Dubai at your feet.',
  camp: 'Glamping pavilions, desert camps, and beach tents for guests who want nature-forward luxury with premium bedding and private outdoor baths.',
};

const HOME_DESTINATIONS = [
  { name: 'Dubai City', count: '2,840 stays', desc: 'From Jumeirah villas to Downtown penthouses', img: PHOTO_POOL[0] },
  { name: 'Palm Jumeirah', count: '612 stays', desc: 'Frond villas & Atlantis-facing suites', img: PHOTO_POOL[2] },
  { name: 'Dubai Marina', count: '1,120 stays', desc: 'Waterfront towers & yacht clubs', img: PHOTO_POOL[9] },
  { name: 'Abu Dhabi', count: '484 stays', desc: 'Saadiyat culture coast & desert escapes', img: PHOTO_POOL[6] },
  { name: 'Maldives', count: '196 stays', desc: 'Overwater villas & reef camps', img: PHOTO_POOL[7] },
  { name: 'Bali', count: '420 stays', desc: 'Rice terrace villas & cliffside retreats', img: PHOTO_POOL[5] },
  { name: 'Santorini', count: '167 stays', desc: 'Caldera caves & whitewashed homes', img: PHOTO_POOL[4] },
  { name: 'Mykonos', count: '142 stays', desc: 'Cycladic villas above the Aegean', img: PHOTO_POOL[11] },
  { name: 'Paris', count: '890 stays', desc: 'Haussmann flats & Left Bank gems', img: PHOTO_POOL[16] },
  { name: 'London', count: '1,050 stays', desc: 'Townhouses in Chelsea & Kensington', img: PHOTO_POOL[18] },
  { name: 'Miami', count: '730 stays', desc: 'South Beach condos & bay villas', img: PHOTO_POOL[20] },
  { name: 'Tokyo', count: '560 stays', desc: 'Design apartments in Shibuya & Minato', img: PHOTO_POOL[22] },
];

const HOME_EDITORIAL = [
  {
    tag: 'Collection',
    title: 'Architect-led villas for design lovers',
    body: 'Concrete, timber, and glass homes chosen for their spatial drama — each with a story from the architect and a photo tour of every room.',
    img: PHOTO_POOL[10],
    cat: 'villa',
    loc: 'jumeirah',
  },
  {
    tag: 'Trending',
    title: 'Family-ready houses with pools & gardens',
    body: 'Multi-bedroom homes with fenced gardens, BBQ terraces, and bunk rooms — plus cribs and high chairs on request.',
    img: PHOTO_POOL[14],
    cat: 'house',
    loc: 'palm',
  },
  {
    tag: 'New',
    title: 'Boutique hotel suites under $600',
    body: 'Recently opened properties with rooftop bars, spa floors, and walk-in rain showers — without the flagship price tag.',
    img: PHOTO_POOL[17],
    cat: 'hotel',
    loc: 'downtown',
  },
];

const HOME_TESTIMONIALS = [
  { quote: 'The Palm villa exceeded every photo — private chef one night, kids loved the pool. Jumeira concierge sorted airport VIP in an hour.', name: 'Amira K.', trip: 'Palm Jumeirah · Villa · 6 nights' },
  { quote: 'We booked three apartments in the Marina for a team off-site. Same building, seamless check-in, and a dedicated host on WhatsApp.', name: 'James L.', trip: 'Dubai Marina · Apartments · 4 nights' },
  { quote: 'Maldives camp stay was unreal — outdoor shower, reef snorkel at dawn, and zero logistics stress. Already rebooking for December.', name: 'Sofia M.', trip: 'Malé Atoll · Camp · 5 nights' },
];

const LISTING_FAQ = [
  { q: 'What is included in the nightly rate?', a: 'Most listings include Wi‑Fi, linens, and standard utilities. Villas may add pool heating or staff fees — always shown before you pay.' },
  { q: 'Can I request early check-in?', a: 'Yes, message the host after booking. Many homes offer flexible arrival when there is no guest checking out the same morning.' },
  { q: 'Are children welcome?', a: 'Family-friendly homes are tagged in filters. Cribs, high chairs, and stair gates are available on many villas and houses.' },
  { q: 'How does cancellation work?', a: 'Free cancellation up to 48 hours before check-in on most stays. Stricter policies are clearly listed on each property page.' },
];

Object.assign(window, {
  PHOTO_POOL,
  PHOTOS,
  FALLBACK_IMG,
  onImgError,
  PROPERTIES,
  LOCATION_GUIDES,
  CATEGORY_BLURBS,
  HOME_DESTINATIONS,
  HOME_EDITORIAL,
  HOME_TESTIMONIALS,
  LISTING_FAQ,
});
