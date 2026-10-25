export function isNemesisPreviewEnvironment() {
  return process.env.VERCEL_ENV === 'preview' || process.env.VERCEL_ENV === 'production'
}

export function isNemesisPresentationHost(host: string | null | undefined) {
  const hostname = (host || '').split(':')[0].toLowerCase()
  const allowedHosts = (process.env.LOCAL_OS_PRESENTATION_HOSTS || 'preview.xencolabs.com')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
  return allowedHosts.includes(hostname)
}

export function hasNemesisDemoAccess(candidate: unknown) {
  const expected = process.env.NEMESIS_DEMO_ACCESS_TOKEN
  if (typeof candidate !== 'string' || !expected || candidate.length !== expected.length) return false
  let difference = 0
  for (let index = 0; index < expected.length; index += 1) {
    difference |= candidate.charCodeAt(index) ^ expected.charCodeAt(index)
  }
  return difference === 0
}

export function hasNemesisDemoRequestAccess(host: string | null | undefined, cookie: unknown) {
  return isNemesisPresentationHost(host) && hasNemesisDemoAccess(cookie)
}
