// Node.js server: serves the built site and handles the contact and careers forms.
// Run `npm run build` first, then `npm start`. Configure SMTP in a .env file (see .env.example).
import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const dist = path.join(__dirname, 'dist')
const MAIL_TO = process.env.MAIL_TO || 'info@anthouli.com'

app.use(express.json({ limit: '200kb' }))

// ---------- mail transport ----------
function transporter() {
  if (!process.env.SMTP_HOST) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  })
}

async function sendMail({ subject, text, replyTo, attachments = [] }) {
  const tx = transporter()
  if (!tx) {
    console.warn('[mail] SMTP not configured. Message logged only:\n', subject, '\n', text)
    if (process.env.NODE_ENV === 'production') throw new Error('Mail server not configured')
    return
  }
  await tx.sendMail({
    from: process.env.MAIL_FROM || `"C. Anthouli Website" <${process.env.SMTP_USER}>`,
    to: MAIL_TO,
    replyTo,
    subject,
    text,
    attachments,
  })
}

const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max)
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

// simple in memory rate limit: 5 submissions per IP per 10 minutes
const hits = new Map()
function rateLimit(req, res, next) {
  const ip = req.ip
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  if (arr.length >= 5) return res.status(429).json({ ok: false, error: 'Too many requests, please try again later.' })
  arr.push(now); hits.set(ip, arr); next()
}

// ---------- contact form ----------
app.post('/api/contact', rateLimit, async (req, res) => {
  try {
    const b = req.body || {}
    const name = clean(b.name, 120), email = clean(b.email, 160), phone = clean(b.phone, 60)
    const company = clean(b.company, 160), service = clean(b.service, 160), message = clean(b.message, 5000)
    if (!name || !isEmail(email) || !phone || !message) return res.status(400).json({ ok: false, error: 'Missing required fields' })
    if (b.website) return res.json({ ok: true }) // honeypot
    await sendMail({
      subject: `Website enquiry${service ? `: ${service}` : ''} | ${name}`,
      replyTo: email,
      text: [`Name: ${name}`, `Company: ${company || '-'}`, `Email: ${email}`, `Phone: ${phone}`, `Service: ${service || '-'}`, `Language: ${clean(b.lang, 5)}`, '', message].join('\n'),
    })
    res.json({ ok: true })
  } catch (err) {
    console.error(err); res.status(500).json({ ok: false, error: 'Could not send message' })
  }
})

// ---------- careers form (with CV upload) ----------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok = /\.(pdf|doc|docx|odt|rtf|txt)$/i.test(file.originalname)
    cb(ok ? null : new Error('Unsupported file type'), ok)
  },
})

app.post('/api/apply', rateLimit, (req, res) => {
  upload.single('cv')(req, res, async (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message })
    try {
      const b = req.body || {}
      const name = clean(b.name, 120), email = clean(b.email, 160), phone = clean(b.phone, 60)
      const position = clean(b.position, 160), message = clean(b.message, 5000)
      if (!name || !isEmail(email) || !phone || !position || !req.file) return res.status(400).json({ ok: false, error: 'Missing required fields or CV' })
      if (b.website) return res.json({ ok: true })
      await sendMail({
        subject: `Job application: ${position} | ${name}`,
        replyTo: email,
        text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Area: ${position}`, `Language: ${clean(b.lang, 5)}`, '', message || '(no message)'].join('\n'),
        attachments: [{ filename: req.file.originalname, content: req.file.buffer }],
      })
      res.json({ ok: true })
    } catch (e) {
      console.error(e); res.status(500).json({ ok: false, error: 'Could not send application' })
    }
  })
})

// ---------- static site ----------
app.use(express.static(dist, { maxAge: '7d', index: false }))
app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))

app.listen(PORT, () => console.log(`C. Anthouli website running on port ${PORT}`))
