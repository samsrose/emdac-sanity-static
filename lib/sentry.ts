import * as Sentry from '@sentry/nextjs'

type Context = Record<string, unknown>

// Initialize Sentry with proper configuration
const initSentry = (): void => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      debug: process.env.NODE_ENV === 'development',
      enabled: process.env.NODE_ENV === 'production',
      environment:
        process.env.NODE_ENV !== 'production'
          ? process.env.NODE_ENV
          : findProdEnv(window.location.href),
      beforeSend(event, hint) {
        // Filter out development errors in production
        if (process.env.NODE_ENV === 'production' && event.exception) {
          const error = hint.originalException as Error | undefined
          if (
            error &&
            error.message &&
            error.message.includes('ResizeObserver loop limit exceeded')
          ) {
            return null
          }
        }
        return event
      },
    })
  }
}

const findProdEnv = (href: string): string | undefined => {
  const regex = /(?:http[s]*:\/\/)*(.*?)\.(?=[^/]*\..{2,5})/i
  return href.match(regex)?.[1]
}

// Initialize Sentry
initSentry()

/**
 * Sentry Event Capture Utilities
 * Comprehensive functions for capturing different types of events
 */

/**
 * Capture an error/exception
 */
export const captureError = (
  error: unknown,
  context: Context = {},
  level: Sentry.SeverityLevel = 'error'
): void => {
  Sentry.withScope((scope) => {
    scope.setLevel(level)

    Object.keys(context).forEach((key) => {
      scope.setContext(key, context[key] as Sentry.Context)
    })

    // Add user information if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        try {
          scope.setUser(JSON.parse(userInfo))
        } catch {
          // Ignore parsing errors
        }
      }
    }

    Sentry.captureException(error)
  })
}

/**
 * Capture a custom message
 */
export const captureMessage = (
  message: string,
  level: Sentry.SeverityLevel = 'info',
  context: Context = {}
): void => {
  Sentry.withScope((scope) => {
    scope.setLevel(level)

    Object.keys(context).forEach((key) => {
      scope.setContext(key, context[key] as Sentry.Context)
    })

    Sentry.captureMessage(message)
  })
}

/**
 * Capture user interactions and events
 */
export const captureUserEvent = (
  action: string,
  data: Context = {},
  category = 'user-interaction'
): void => {
  Sentry.addBreadcrumb({
    message: action,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  })

  // Also capture as a message for important events
  if (data.important) {
    captureMessage(`User Action: ${action}`, 'info', {
      userAction: {
        action,
        category,
        data,
      },
    })
  }
}

/**
 * Capture API errors
 */
export const captureApiError = (
  endpoint: string,
  status: number,
  response: unknown = {},
  request: unknown = {}
): void => {
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'api')
    scope.setContext('api', {
      endpoint,
      status,
      response: typeof response === 'string' ? response : JSON.stringify(response),
      request: typeof request === 'string' ? request : JSON.stringify(request),
    })

    const error = new Error(`API Error: ${endpoint} returned ${status}`) as Error & {
      status?: number
    }
    error.name = 'ApiError'
    error.status = status

    Sentry.captureException(error)
  })
}

/**
 * Capture performance metrics
 */
export const capturePerformance = (
  metric: string,
  value: number,
  unit = 'ms'
): void => {
  Sentry.addBreadcrumb({
    message: `Performance: ${metric}`,
    category: 'performance',
    level: 'info',
    data: {
      metric,
      value,
      unit,
    },
    timestamp: Date.now() / 1000,
  })
}

/**
 * Set user context for Sentry
 */
export const setUserContext = (user: Sentry.User): void => {
  Sentry.setUser(user)

  // Store in localStorage for persistence
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
}

/**
 * Clear user context
 */
export const clearUserContext = (): void => {
  Sentry.setUser(null)

  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('userInfo')
  }
}

/**
 * Add custom tags to Sentry context
 */
export const setTags = (tags: Record<string, string>): void => {
  Object.keys(tags).forEach((key) => {
    Sentry.setTag(key, tags[key])
  })
}

/**
 * Add custom context to Sentry
 */
export const setContext = (key: string, context: Context): void => {
  Sentry.setContext(key, context as Sentry.Context)
}

/**
 * Capture form validation errors
 */
export const captureFormError = (
  formName: string,
  errors: unknown,
  formData: unknown = {}
): void => {
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'form-validation')
    scope.setContext('form', {
      name: formName,
      errors: typeof errors === 'string' ? errors : JSON.stringify(errors),
      data: typeof formData === 'string' ? formData : JSON.stringify(formData),
    })

    const error = new Error(`Form validation failed: ${formName}`)
    error.name = 'FormValidationError'

    Sentry.captureException(error)
  })
}

/**
 * Capture navigation events
 */
export const captureNavigation = (
  from: string,
  to: string,
  metadata: Context = {}
): void => {
  Sentry.addBreadcrumb({
    message: `Navigation: ${from} → ${to}`,
    category: 'navigation',
    level: 'info',
    data: {
      from,
      to,
      ...metadata,
    },
    timestamp: Date.now() / 1000,
  })
}

// Export Sentry instance for direct access if needed
export { Sentry }
