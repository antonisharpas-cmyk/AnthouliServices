# C. Anthouli Ltd website

Single page website for C. Anthouli Ltd (Tax, Audit, Advisory, Larnaca, Cyprus).
Built with React, Vite, Tailwind CSS and react-i18next. Served in production by a small Node.js (Express) server.

## Languages
English (default), Greek and Russian. All copy lives in `src/locales/{en,el,ru}.json`.
The visitor's choice is remembered in localStorage.

## Pages (React Router)
- `/` Home: hero, short About, services overview, Why Choose Us
- `/about` About Us, values, team, Why Choose Us
- `/services` full breakdown of the 9 service lines
- `/why-cyprus` Why Cyprus
- `/careers` Careers with application form (CV upload required)
- `/contact` Contact details, form and map
- `/link` hidden "link in bio" page (not in the navigation)

## Forms
Both forms post to the Node server (`/api/contact` and `/api/apply`), which emails them to `MAIL_TO` using the SMTP settings in `.env` (copy `.env.example`).
Without SMTP settings the server logs submissions to the console in development and returns an error in production.
The careers form requires a CV (PDF, Word, ODT, RTF or TXT, up to 5 MB) and will not submit until every required field is filled.
Contact details live in `src/data/site.js`.

## Run locally
```
npm install
npm run dev          # Vite on http://localhost:5173 (proxies /api to the Node server)
npm run dev:server   # in a second terminal: Node server on http://localhost:3000 for the forms
```

## Production
```
npm run build
npm start
```
`npm start` runs `server.js`, which serves the `dist` folder on `PORT` (default 3000). On Render use build command `npm install && npm run build` and start command `npm start`.

## Brand
Colours are taken from the logo: dark green `#688948`, light green `#b4c2a2`, wordmark grey `#827e79`, logo background `#f6f6f6`.

## Photos and video (optional)
The design works without any photos, but looks best with them. Drop files here and they are picked up automatically:
- `public/media/hero.mp4` full width background video for the home hero (keep it short, muted, around 10 to 20 seconds, under 8 MB). `public/img/hero.jpg` is used as the still image / poster.
- `public/img/services/<name>.jpg` background photo for each service tile on the home page: `calculator.jpg` (Tax Advisory), `file-check.jpg` (Audit), `trending-up.jpg` (Tax Compliance), `book-open.jpg` (Accounting), `receipt.jpg` (VAT), `users.jpg` (Payroll), `building.jpg` (Company Formation), `briefcase.jpg` (Business Advisory), `plane.jpg` (Relocation). Landscape, around 1200 x 900 px.
Missing files fall back to the green gradients you see now.
