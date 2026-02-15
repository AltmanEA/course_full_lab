import { describe, it, expect } from 'vitest'
import { createSessionCookieConfig } from './bauth22'

describe('bauth22 - Secure cookie', () => {
  it('should enable secure in production', () => {
    const config = createSessionCookieConfig('production')

    expect(config.secure).toBe(true)
  })

  it('should disable secure in development', () => {
    const config = createSessionCookieConfig('development')

    expect(config.secure).toBe(false)
  })

  it('should keep httpOnly enabled', () => {
    const config = createSessionCookieConfig('production')

    expect(config.httpOnly).toBe(true)
  })

  it('should keep cookie name unchanged', () => {
    const config = createSessionCookieConfig('production')

    expect(config.name).toBe('session')
  })
})
