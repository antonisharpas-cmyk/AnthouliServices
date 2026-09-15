// Posts a form to the Node server. Accepts a plain object or a FormData (for file uploads).
export async function postForm(path, data) {
  const isFD = data instanceof FormData
  const res = await fetch(path, {
    method: 'POST',
    headers: isFD ? undefined : { 'Content-Type': 'application/json' },
    body: isFD ? data : JSON.stringify(data),
  })
  let json = {}
  try { json = await res.json() } catch (e) { /* no body */ }
  if (!res.ok || json.ok === false) throw new Error(json.error || `Request failed (${res.status})`)
  return json
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v) => v.replace(/[\s()+-]/g, '').length >= 6 && /^[+\d][\d\s()-]*$/.test(v.trim())
