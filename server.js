// Minimal Node.js server for production hosting (Render, VPS, etc.)
// Run `npm run build` first, then `npm start`.
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const dist = path.join(__dirname, 'dist')

app.use(express.static(dist, { maxAge: '7d', index: false }))
app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`C. Anthouli website running on port ${PORT}`)
})
