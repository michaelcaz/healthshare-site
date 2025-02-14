import { NextRequest, NextResponse } from 'next/server'
import { logError } from './error-logging'

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public context?: Record<string, any>
  ) {
    super(message)
    this.name = 'APIError'
  }
}

type ApiHandler = (req: NextRequest) => Promise<NextResponse>

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      const apiError = error instanceof APIError
        ? error
        : new APIError(
            error instanceof Error ? error.message : 'An unexpected error occurred',
            500
          )

      logError(error, {
        type: 'api_error',
        path: req.nextUrl.pathname,
        method: req.method,
        ...apiError.context
      })

      return NextResponse.json(
        {
          error: apiError.message,
          status: apiError.statusCode
        },
        { status: apiError.statusCode }
      )
    }
  }
} 