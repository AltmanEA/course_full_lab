import { describe, it, expect } from 'vitest'
import { createSessionCookieConfig } from './bauth21'

describe('bauth21 - HttpOnly cookie', () => {
  it('should return object with httpOnly field', () => {
    const config = createSessionCookieConfig()

    expect(config).toHaveProperty('httpOnly')
  })

  it('should set httpOnly to true', () => {
    const config = createSessionCookieConfig()

    expect(config.httpOnly).toBe(true)
  })

  it('should keep cookie name unchanged', () => {
    const config = createSessionCookieConfig()

    expect(config.name).toBe('session')
  })
})
