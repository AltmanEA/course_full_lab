import { describe, it, expect } from 'vitest'
import {
  routeGuard,
  procedureGuard,
  UnauthorizedError,
} from './bauth28'

describe('bauth28 - Middleware levels', () => {
  it('routeGuard should throw if session is missing', () => {
    expect(() => routeGuard(null)).toThrow(UnauthorizedError)
  })

  it('routeGuard should pass if session exists', () => {
    expect(routeGuard({ id: '1' })).toBe(true)
  })

  it('procedureGuard should throw if user is missing', () => {
    expect(() => procedureGuard(null)).toThrow(UnauthorizedError)
  })

  it('procedureGuard should pass if user exists', () => {
    expect(procedureGuard({ id: '1' })).toBe(true)
  })
})
