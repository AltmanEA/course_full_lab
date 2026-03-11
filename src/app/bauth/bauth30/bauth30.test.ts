import { describe, it, expect } from 'vitest'
import { createSessionSecurityConfig } from './bauth30'

describe('bauth30 - Production-ready security config', () => {
  const fakeNow = 1_000
  const clock = () => fakeNow

  it('should enable httpOnly', () => {
    const config = createSessionSecurityConfig('production', 5_000, clock)

    expect(config.cookie.httpOnly).toBe(true)
  })

  it('should enable secure only in production', () => {
    const prod = createSessionSecurityConfig('production', 5_000, clock)
    const dev = createSessionSecurityConfig('development', 5_000, clock)

    expect(prod.cookie.secure).toBe(true)
    expect(dev.cookie.secure).toBe(false)
  })

  it('should configure sameSite correctly', () => {
    const prod = createSessionSecurityConfig('production', 5_000, clock)
    const dev = createSessionSecurityConfig('development', 5_000, clock)

    expect(prod.cookie.sameSite).toBe('lax')
    expect(dev.cookie.sameSite).toBe('strict')
  })

  it('should calculate expiration correctly', () => {
    const config = createSessionSecurityConfig('production', 5_000, clock)

    expect(config.expiresAt).toBe(fakeNow + 5_000)
  })
})
