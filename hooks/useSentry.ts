import { useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  captureError,
  captureMessage,
  captureUserEvent,
  captureApiError,
  capturePerformance,
  setUserContext,
  clearUserContext,
  setTags,
  setContext,
  captureFormError,
  captureNavigation,
  Sentry,
} from '../lib/sentry'

type Context = Record<string, unknown>

/**
 * Custom React hook for Sentry integration
 * Provides easy access to Sentry functions and automatic navigation tracking
 */
export const useSentry = () => {
  const router = useRouter()
  const previousRoute = useRef<string | null>(null)

  // Track navigation changes
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      if (previousRoute.current) {
        captureNavigation(previousRoute.current, url, {
          timestamp: Date.now(),
        })
      }
      previousRoute.current = url
    }

    const handleRouteChangeError = (err: Error, url: string): void => {
      captureError(err, {
        navigation: {
          url,
          previousUrl: previousRoute.current,
        },
      })
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router])

  // Memoized functions to prevent unnecessary re-renders
  const sentry = {
    // Error handling
    captureError: useCallback(
      (error: unknown, context: Context = {}, level: Sentry.SeverityLevel = 'error') => {
        captureError(error, context, level)
      },
      []
    ),

    // Message capture
    captureMessage: useCallback(
      (message: string, level: Sentry.SeverityLevel = 'info', context: Context = {}) => {
        captureMessage(message, level, context)
      },
      []
    ),

    // User events
    captureUserEvent: useCallback(
      (action: string, data: Context = {}, category = 'user-interaction') => {
        captureUserEvent(action, data, category)
      },
      []
    ),

    // API errors
    captureApiError: useCallback(
      (endpoint: string, status: number, response: unknown = {}, request: unknown = {}) => {
        captureApiError(endpoint, status, response, request)
      },
      []
    ),

    // Performance tracking
    capturePerformance: useCallback((metric: string, value: number, unit = 'ms') => {
      capturePerformance(metric, value, unit)
    }, []),

    // User context
    setUser: useCallback((user: Sentry.User) => {
      setUserContext(user)
    }, []),

    clearUser: useCallback(() => {
      clearUserContext()
    }, []),

    // Tags and context
    setTags: useCallback((tags: Record<string, string>) => {
      setTags(tags)
    }, []),

    setContext: useCallback((key: string, context: Context) => {
      setContext(key, context)
    }, []),

    // Form errors
    captureFormError: useCallback(
      (formName: string, errors: unknown, formData: unknown = {}) => {
        captureFormError(formName, errors, formData)
      },
      []
    ),

    // Navigation (manual)
    captureNavigation: useCallback((from: string, to: string, metadata: Context = {}) => {
      captureNavigation(from, to, metadata)
    }, []),
  }

  return sentry
}

/**
 * Hook for tracking component performance
 */
export const useSentryPerformance = (componentName: string) => {
  const startTime = useRef<number>(Date.now())

  useEffect(() => {
    const endTime = Date.now()
    const renderTime = endTime - startTime.current

    capturePerformance(`${componentName}-render`, renderTime)

    return () => {
      // Component unmount tracking
      capturePerformance(`${componentName}-unmount`, Date.now() - startTime.current)
    }
  }, [componentName])

  const trackAction = useCallback(
    (actionName: string, actionData: Context = {}) => {
      const actionTime = Date.now()
      captureUserEvent(`${componentName}-${actionName}`, {
        ...actionData,
        timestamp: actionTime,
      })
    },
    [componentName]
  )

  return { trackAction }
}

/**
 * Hook for form error tracking
 */
export const useSentryForm = (formName: string) => {
  const captureFormValidationError = useCallback(
    (errors: unknown, formData: Record<string, unknown> = {}) => {
      // Sanitize form data (remove sensitive information)
      const sanitizedData: Record<string, unknown> = { ...formData }
      const sensitiveFields = ['password', 'ssn', 'creditCard', 'token']

      sensitiveFields.forEach((field) => {
        if (sanitizedData[field]) {
          sanitizedData[field] = '[REDACTED]'
        }
      })

      captureFormError(formName, errors, sanitizedData)
    },
    [formName]
  )

  const trackFormSubmission = useCallback(
    (success = true, data: Context = {}) => {
      captureUserEvent(
        `form-submission-${formName}`,
        {
          success,
          ...data,
        },
        'form'
      )
    },
    [formName]
  )

  const trackFormFieldError = useCallback(
    (fieldName: string, error: Error | string, value: string | number = '') => {
      captureUserEvent(
        `form-field-error-${formName}`,
        {
          field: fieldName,
          error: typeof error === 'string' ? error : error.message,
          value: value.toString().substring(0, 50), // Limit value length
        },
        'form-validation'
      )
    },
    [formName]
  )

  return {
    captureFormValidationError,
    trackFormSubmission,
    trackFormFieldError,
  }
}

export default useSentry
