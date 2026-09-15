# C. Anthouli Ltd website

Single page website for C. Anthouli Ltd (Tax, Audit, Advisory, Larnaca, Cyprus).
Built with React, Vite, Tailwind CSS and react-i18next. Served in production by a small Node.js (Express) server.

## Languages
English (default), Greek and Russian. All copy lives in `src/locales/{en,el,ru}.json`.
The visitor's choice is remembered in localStorage.

## Sections
Hero, About Us (with team), Services (9 service cards), Why Choose Us, Why Cyprus, Careers (with application form), Contact (with map) and Footer.
Section ids: `about`, `services`, `why-us`, `why-cyprus`, `careers`, `contact`.

## Forms
Both forms open the visitor's email app with a prefilled message to info@anthouli.com (no backend needed).
To change the address, edit `src/data/site.js`.

## Run locally
```
npm install
npm run dev
```

## Production
```
npm run build
npm start
```
`npm start` runs `server.js`, which serves the `dist` folder on `PORT` (default 3000). On Render use build command `npm install && npm run build` and start command `npm start`.

## Brand
Colours are taken from the logo: dark green `#688948`, light green `#b4c2a2`, wordmark grey `#827e79`, logo background `#f6f6f6`.
