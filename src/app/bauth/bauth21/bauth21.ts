export type SessionCookieConfig = {
  name: string
  httpOnly: boolean
}

export function createSessionCookieConfig(): SessionCookieConfig {
  return {
    name: 'session',
    httpOnly: false, // TODO: настроить корректно
  }
}
