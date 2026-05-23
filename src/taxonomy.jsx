// Shared categories, locations, and listing helpers

const CATEGORIES = [
  { id: 'all', label: 'All', labelLong: 'All categories', Icon: IconGridSquares, subtitle: 'Browse every kind of stay' },
  { id: 'house', label: 'House', labelLong: 'House', Icon: IconHouse, subtitle: 'Family homes & townhouses' },
  { id: 'hotel', label: 'Hotel', labelLong: 'Hotel', Icon: IconHotel, subtitle: 'Boutique & branded hotels' },
  { id: 'villa', label: 'Villa', labelLong: 'Villa', Icon: IconVilla, subtitle: 'Standalone luxury homes' },
  { id: 'apartment', label: 'Apartment', labelLong: 'Apartment', Icon: IconApartment, subtitle: 'In residential buildings' },
  { id: 'camp', label: 'Camp House', labelLong: 'Camp House', Icon: IconCamp, subtitle: 'Unique outdoor stays' },
];

const CATEGORY_LABELS = {
  house: 'HOUSE',
  hotel: 'HOTEL',
  villa: 'VILLA',
  apartment: 'APARTMENT',
  camp: 'CAMP HOUSE',
};

const LOCATIONS = [
  { id: 'jumeirah', city: 'Dubai City', area: 'Jumeirah', cityGroup: 'dubai' },
  { id: 'palm', city: 'Dubai City', area: 'Palm Jumeirah', cityGroup: 'dubai' },
  { id: 'marina', city: 'Dubai City', area: 'Dubai Marina', cityGroup: 'dubai' },
  { id: 'downtown', city: 'Dubai City', area: 'Downtown', cityGroup: 'dubai' },
  { id: 'abudhabi', city: 'Abu Dhabi', area: 'Saadiyat Island', cityGroup: 'abudhabi' },
  { id: 'maldives', city: 'Maldives', area: 'Malé Atoll', cityGroup: 'maldives' },
];

const CITY_GROUPS = [
  { id: 'dubai', name: 'Dubai City' },
  { id: 'abudhabi', name: 'Abu Dhabi' },
  { id: 'maldives', name: 'Maldives' },
];

const DEST_TO_LOC = {
  'Dubai City': 'jumeirah',
  'Palm Jumeirah': 'palm',
  'Abu Dhabi': 'abudhabi',
  'Maldives': 'maldives',
  'Bali': 'jumeirah',
  'Santorini': 'marina',
};

const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES.find((c) => c.id === 'villa');
const getLocation = (id) => LOCATIONS.find((l) => l.id === id) || LOCATIONS[0];

const getListingTitle = (categoryId, locationId) => {
  const cat = getCategory(categoryId);
  const loc = getLocation(locationId);
  if (categoryId === 'all') return `${loc.city}, ${loc.area}`;
  return `${loc.city}, ${loc.area} ${cat.label}`;
};

const getListingSubtitle = (categoryId, locationId, count) => {
  const cat = getCategory(categoryId);
  const loc = getLocation(locationId);
  const n = count;
  if (categoryId === 'all') return `${n} stays available in ${loc.city}`;
  const plural = cat.id === 'hotel' ? 'Hotels' : cat.id === 'apartment' ? 'Apartments' : `${cat.label}s`;
  return `${n} ${plural} available in ${loc.city}`;
};

const filterProperties = (properties, categoryId, locationId) => {
  return properties.filter((p) => {
    const matchCat = categoryId === 'all' || p.category === categoryId;
    const matchLoc = !locationId || p.locationId === locationId;
    return matchCat && matchLoc;
  });
};

const buildListingPath = (categoryId, locationId) => {
  if (categoryId === 'all') return `/location/${locationId}`;
  return `/location/${locationId}/category/${categoryId}`;
};

const parseListingPath = (pathname) => {
  const locCat = pathname.match(/^\/location\/([^/]+)\/category\/([^/]+)\/?$/);
  if (locCat) return { view: 'listing', locationId: locCat[1], categoryId: locCat[2] };

  const locOnly = pathname.match(/^\/location\/([^/]+)\/?$/);
  if (locOnly) return { view: 'listing', locationId: locOnly[1], categoryId: 'all' };

  const catOnly = pathname.match(/^\/category\/([^/]+)\/?$/);
  if (catOnly) return { view: 'listing', categoryId: catOnly[1], locationId: null };

  if (pathname === '/' || pathname === '/listing' || pathname === '/browse') {
    return { view: 'listing', categoryId: 'villa', locationId: 'jumeirah' };
  }
  if (pathname === '/home') return { view: 'home' };
  if (pathname === '/login') return { view: 'login' };
  if (pathname === '/host') return { view: 'host' };
  if (pathname === '/account') return { view: 'account' };
  if (pathname === '/contact') return { view: 'contact' };

  return null;
};

Object.assign(window, {
  CATEGORIES,
  CATEGORY_LABELS,
  LOCATIONS,
  CITY_GROUPS,
  DEST_TO_LOC,
  getCategory,
  getLocation,
  getListingTitle,
  getListingSubtitle,
  filterProperties,
  buildListingPath,
  parseListingPath,
});
