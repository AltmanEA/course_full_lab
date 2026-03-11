import { describe, it, expect } from 'vitest'
import { createSessionCookieConfig } from './bauth23'

describe('bauth23 - SameSite policy', () => {
  it('should set lax in production', () => {
    const config = createSessionCookieConfig('production')

    expect(config.sameSite).toBe('lax')
  })

  it('should set strict in development', () => {
    const config = createSessionCookieConfig('development')

    expect(config.sameSite).toBe('strict')
  })

  it('should keep secure aligned with environment', () => {
    const prod = createSessionCookieConfig('production')
    const dev = createSessionCookieConfig('development')

    expect(prod.secure).toBe(true)
    expect(dev.secure).toBe(false)
  })

  it('should keep httpOnly enabled', () => {
    const config = createSessionCookieConfig('production')

    expect(config.httpOnly).toBe(true)
  })
})
