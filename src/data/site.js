export const SITE = {
  name: 'C. Anthouli Ltd',
  email: 'info@anthouli.com',
  phone: '+357 24821177',
  phoneDisplay: '+357 24 821177',
  mobile: '+357 99572563',
  mobileDisplay: '+357 99 572563',
  website: 'https://www.anthouli.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=C.+Anthouli+Ltd+G.+Mathaiou+Tower+Piliou+8+Larnaca',
  mapsEmbed: 'https://www.google.com/maps?q=G.+Mathaiou+Tower,+Piliou+8,+Larnaca+6037,+Cyprus&output=embed',
  instagram: 'https://www.instagram.com/anthouli_ltd/',
  facebook: 'https://www.facebook.com/p/C-Anthouli-Ltd-100063765801604/',
}

// Main navigation: translation key -> route
export const NAV = [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'whyCyprus', path: '/why-cyprus' },
  { key: 'about', path: '/about' },
  { key: 'careers', path: '/careers' },
  { key: 'contact', path: '/contact' },
]

export const ROUTES = Object.fromEntries(NAV.map((n) => [n.key, n.path]))
