export type Environment = 'development' | 'production'

export type SameSitePolicy = 'lax' | 'strict'

export type SessionCookieConfig = {
  name: string
  httpOnly: boolean
  secure: boolean
  sameSite: SameSitePolicy
}

export function createSessionCookieConfig(
  env: Environment
): SessionCookieConfig {
  return {
    name: 'session',
    httpOnly: true,
    secure: env === 'production',
    sameSite: 'strict', // TODO: настроить корректно
  }
}
