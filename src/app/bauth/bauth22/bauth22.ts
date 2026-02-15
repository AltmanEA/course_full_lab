export type Environment = 'development' | 'production'

export type SessionCookieConfig = {
  name: string
  httpOnly: boolean
  secure: boolean
}

export function createSessionCookieConfig(
  env: Environment
): SessionCookieConfig {
  return {
    name: 'session',
    httpOnly: true,
    secure: false, // TODO: настроить корректно
  }
}
