import { randomUUID } from 'crypto'

export interface DataAccess {
  // существующие методы остаются без изменений
  [key: string]: unknown
}

export interface Context {
  dataAccess: DataAccess

  // Infrastructure (optional, production-ready extensions)
  requestId?: string

  logger?: {
    info(message: string): void
    error(message: string): void
  }

  auditService?: {
    record(event: unknown): void
  }

  user?: {
    id: string
    role: 'USER' | 'ADMIN'
  }
}

export const createContext = (params: {
  dataAccess: DataAccess
  requestId?: string
  logger?: Context['logger']
  auditService?: Context['auditService']
  user?: Context['user']
}): Context => {
  return {
    dataAccess: params.dataAccess,
    requestId: params.requestId,
    logger: params.logger,
    auditService: params.auditService,
    user: params.user,
  }
}