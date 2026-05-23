// Jumeira icon set — thin-line, rounded ends
// Use color="currentColor" so parents control color via CSS color.

const Icon = ({ children, size = 22, stroke = 1.8, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

const IconChevron = (p) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

const IconGridSquares = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </Icon>
);

const IconHouse = (p) => (
  <Icon {...p}>
    <path d="M3.5 11L12 4l8.5 7" />
    <path d="M5.5 10v9h13v-9" />
    <path d="M10 19v-5h4v5" />
  </Icon>
);

const IconHotel = (p) => (
  <Icon {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="1.6" />
    <path d="M8.5 7.5h2M13.5 7.5h2M8.5 11.5h2M13.5 11.5h2M8.5 15.5h2M13.5 15.5h2" />
    <path d="M10 20.5v-3h4v3" />
  </Icon>
);

const IconVilla = (p) => (
  <Icon {...p}>
    <path d="M4 20.5h16" />
    <path d="M5.5 20.5V12L12 7l6.5 5v8.5" />
    <circle cx="12" cy="13.5" r="1.6" />
    <path d="M9 20.5v-3a3 3 0 0 1 6 0v3" />
  </Icon>
);

const IconApartment = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6" width="7" height="14.5" rx="1.2" />
    <rect x="13.5" y="3.5" width="7" height="17" rx="1.2" />
    <path d="M5.5 9.5h3M5.5 13h3M5.5 16.5h3M15.5 7h3M15.5 10.5h3M15.5 14h3M15.5 17.5h3" />
  </Icon>
);

const IconCamp = (p) => (
  <Icon {...p}>
    <path d="M3 20.5h18" />
    <path d="M5 20.5l7-13 7 13" />
    <path d="M9.5 20.5L12 16l2.5 4.5" />
  </Icon>
);

const IconMapPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-7-7-7-12a7 7 0 1 1 14 0c0 5-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.6" />
  </Icon>
);

const IconListRows = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="5.5" rx="1.6" />
    <rect x="3.5" y="13.5" width="17" height="5.5" rx="1.6" />
  </Icon>
);

const IconFilter = (p) => (
  <Icon {...p}>
    <path d="M4 5h16l-6 8v6l-4-2v-4z" />
  </Icon>
);

const IconBookmark = ({ size = 22, filled = false, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path d="M6 4.5h12v16l-6-4-6 4z" />
  </svg>
);

const IconStar = ({ size = 17, filled = true, color = '#FF8A00', emptyColor = '#D8D8E6' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={filled ? color : emptyColor} strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3.2l2.7 5.7 6.1.7-4.5 4.3 1.2 6.1L12 17.1 6.5 20l1.2-6.1L3.2 9.6l6.1-.7z" />
  </svg>
);

const IconStarHalf = ({ size = 17, color = '#FF8A00', emptyColor = '#D8D8E6' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="halfStar" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor={color} />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 3.2l2.7 5.7 6.1.7-4.5 4.3 1.2 6.1L12 17.1 6.5 20l1.2-6.1L3.2 9.6l6.1-.7z"
      fill="url(#halfStar)"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const IconHeart = ({ size = 22, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </svg>
);

const IconShare = (p) => (
  <Icon {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
  </Icon>
);

const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
  </Icon>
);

const IconUsers = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19.5c0-3 2.7-5 6-5s6 2 6 5" />
    <path d="M16 4.5a3.2 3.2 0 0 1 0 6.5" />
    <path d="M17 14.5c2.4.5 4 2.4 4 5" />
  </Icon>
);

const IconCheck = (p) => (
  <Icon {...p}>
    <path d="M5 12.5l4 4 10-10" />
  </Icon>
);

const IconArrowRight = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

const IconClose = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

const IconWifi = (p) => (
  <Icon {...p}>
    <path d="M2.5 9.5C5 7 8.4 5.5 12 5.5s7 1.5 9.5 4" />
    <path d="M5.5 12.5C7.3 10.8 9.5 9.8 12 9.8s4.7 1 6.5 2.7" />
    <path d="M8.5 15.5c1-1 2.2-1.5 3.5-1.5s2.5.5 3.5 1.5" />
    <circle cx="12" cy="18.7" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

const IconPool = (p) => (
  <Icon {...p}>
    <path d="M3 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1" />
    <path d="M3 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1" />
    <path d="M7 14V6a2 2 0 0 1 4 0v1M13 14V6a2 2 0 0 1 4 0v1" />
    <path d="M7 9h4M7 12h4" />
  </Icon>
);

const IconAC = (p) => (
  <Icon {...p}>
    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </Icon>
);

const IconParking = (p) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3" />
  </Icon>
);

const IconKitchen = (p) => (
  <Icon {...p}>
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M5 11h14M9 7v1M9 15.5v1.5" />
  </Icon>
);

const IconGarden = (p) => (
  <Icon {...p}>
    <path d="M12 20v-7" />
    <path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5z" />
    <path d="M12 13c3 0 5-2 5-5-3 0-5 2-5 5z" />
    <path d="M4 20h16" />
  </Icon>
);

const IconBeach = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="9" r="3" />
    <path d="M12 12v8M5 20c2-1 5-1 7 0s5 1 7 0" />
    <path d="M12 6V3M15.5 7.5l2-2M8.5 7.5l-2-2" />
  </Icon>
);

Object.assign(window, {
  Icon,
  IconSearch, IconChevron, IconGridSquares, IconHouse, IconHotel, IconVilla,
  IconApartment, IconCamp, IconMapPin, IconListRows, IconFilter, IconBookmark,
  IconStar, IconStarHalf, IconHeart, IconShare, IconCalendar, IconUsers,
  IconCheck, IconArrowRight, IconClose, IconWifi, IconPool, IconAC, IconParking,
  IconKitchen, IconGarden, IconBeach,
});
