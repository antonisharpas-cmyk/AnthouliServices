export const SITE = {
  name: 'C. Anthouli Ltd',
  email: 'info@anthouli.com',
  phone: '+357 24821177',
  phoneDisplay: '+357 24 821177',
  mobile: '+357 99572563',
  mobileDisplay: '+357 99 572563',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=C.+Anthouli+Ltd+G.+Mathaiou+Tower+Piliou+8+Larnaca',
  mapsEmbed: 'https://www.google.com/maps?q=G.+Mathaiou+Tower,+Piliou+8,+Larnaca+6037,+Cyprus&output=embed',
  instagram: 'https://www.instagram.com/anthouli_ltd/',
  facebook: 'https://www.facebook.com/p/C-Anthouli-Ltd-100063765801604/',
}

export const NAV_SECTIONS = ['about', 'services', 'whyUs', 'whyCyprus', 'careers', 'contact']
export const SECTION_IDS = { about: 'about', services: 'services', whyUs: 'why-us', whyCyprus: 'why-cyprus', careers: 'careers', contact: 'contact' }

export function mailto(to, subject, body) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
