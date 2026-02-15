import { describe, it, expect } from 'vitest'
import { validateCsrf, CsrfError } from './bauth27'

describe('bauth27 - CSRF validation', () => {
  it('should throw if session token is missing', () => {
    expect(() =>
      validateCsrf(null, 'abc')
    ).toThrow(CsrfError)
  })

  it('should throw if request token is missing', () => {
    expect(() =>
      validateCsrf('abc', null)
    ).toThrow(CsrfError)
  })

  it('should throw if tokens do not match', () => {
    expect(() =>
      validateCsrf('abc', 'def')
    ).toThrow(CsrfError)
  })

  it('should return true if tokens match', () => {
    expect(validateCsrf('abc', 'abc')).toBe(true)
  })
})
