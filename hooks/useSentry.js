import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
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
} from '../lib/sentry';

/**
 * Custom React hook for Sentry integration
 * Provides easy access to Sentry functions and automatic navigation tracking
 */
export const useSentry = () => {
  const router = useRouter();
  const previousRoute = useRef(null);

  // Track navigation changes
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (previousRoute.current) {
        captureNavigation(previousRoute.current, url, {
          timestamp: Date.now(),
        });
      }
      previousRoute.current = url;
    };

    const handleRouteChangeError = (err, url) => {
      captureError(err, {
        navigation: {
          url,
          previousUrl: previousRoute.current,
        },
      });
    };

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  // Memoized functions to prevent unnecessary re-renders
  const sentry = {
    // Error handling
    captureError: useCallback((error, context = {}, level = 'error') => {
      captureError(error, context, level);
    }, []),

    // Message capture
    captureMessage: useCallback((message, level = 'info', context = {}) => {
      captureMessage(message, level, context);
    }, []),

    // User events
    captureUserEvent: useCallback((action, data = {}, category = 'user-interaction') => {
      captureUserEvent(action, data, category);
    }, []),

    // API errors
    captureApiError: useCallback((endpoint, status, response = {}, request = {}) => {
      captureApiError(endpoint, status, response, request);
    }, []),

    // Performance tracking
    capturePerformance: useCallback((metric, value, unit = 'ms') => {
      capturePerformance(metric, value, unit);
    }, []),

    // User context
    setUser: useCallback((user) => {
      setUserContext(user);
    }, []),

    clearUser: useCallback(() => {
      clearUserContext();
    }, []),

    // Tags and context
    setTags: useCallback((tags) => {
      setTags(tags);
    }, []),

    setContext: useCallback((key, context) => {
      setContext(key, context);
    }, []),

    // Form errors
    captureFormError: useCallback((formName, errors, formData = {}) => {
      captureFormError(formName, errors, formData);
    }, []),

    // Navigation (manual)
    captureNavigation: useCallback((from, to, metadata = {}) => {
      captureNavigation(from, to, metadata);
    }, []),
  };

  return sentry;
};

/**
 * Hook for tracking component performance
 * @param {string} componentName - Name of the component
 */
export const useSentryPerformance = (componentName) => {
  const startTime = useRef(Date.now());

  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;

    capturePerformance(`${componentName}-render`, renderTime);

    return () => {
      // Component unmount tracking
      capturePerformance(`${componentName}-unmount`, Date.now() - startTime.current);
    };
  }, [componentName]);

  const trackAction = useCallback((actionName, actionData = {}) => {
    const actionTime = Date.now();
    captureUserEvent(`${componentName}-${actionName}`, {
      ...actionData,
      timestamp: actionTime,
    });
  }, [componentName]);

  return { trackAction };
};

/**
 * Hook for form error tracking
 * @param {string} formName - Name of the form
 */
export const useSentryForm = (formName) => {
  const captureFormValidationError = useCallback((errors, formData = {}) => {
    // Sanitize form data (remove sensitive information)
    const sanitizedData = { ...formData };
    const sensitiveFields = ['password', 'ssn', 'creditCard', 'token'];
    
    sensitiveFields.forEach(field => {
      if (sanitizedData[field]) {
        sanitizedData[field] = '[REDACTED]';
      }
    });

    captureFormError(formName, errors, sanitizedData);
  }, [formName]);

  const trackFormSubmission = useCallback((success = true, data = {}) => {
    captureUserEvent(`form-submission-${formName}`, {
      success,
      ...data,
    }, 'form');
  }, [formName]);

  const trackFormFieldError = useCallback((fieldName, error, value = '') => {
    captureUserEvent(`form-field-error-${formName}`, {
      field: fieldName,
      error: error.message || error,
      value: value.toString().substring(0, 50), // Limit value length
    }, 'form-validation');
  }, [formName]);

  return {
    captureFormValidationError,
    trackFormSubmission,
    trackFormFieldError,
  };
};

export default useSentry;
