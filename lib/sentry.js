import * as Sentry from '@sentry/nextjs';

// Initialize Sentry with proper configuration
const initSentry = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      debug: process.env.NODE_ENV === 'development',
      enabled: process.env.NODE_ENV === 'production',
      environment: process.env.NODE_ENV !== 'production'
        ? process.env.NODE_ENV : findProdEnv(window.location.href),
      beforeSend(event, hint) {
        // Filter out development errors in production
        if (process.env.NODE_ENV === 'production' && event.exception) {
          const error = hint.originalException;
          if (error && error.message && error.message.includes('ResizeObserver loop limit exceeded')) {
            return null;
          }
        }
        return event;
      },
    });
  }
};

const findProdEnv = (href) => {
  const regex = /(?:http[s]*:\/\/)*(.*?)\.(?=[^/]*\..{2,5})/i;
  return href.match(regex)[1];
};

myUndefinedFunction(); // This will be captured by Sentry

// Initialize Sentry
initSentry();

/**
 * Sentry Event Capture Utilities
 * Comprehensive functions for capturing different types of events
 */

/**
 * Capture an error/exception
 * @param {Error} error - The error object
 * @param {Object} context - Additional context information
 * @param {string} level - Error level (error, warning, info, debug)
 */
export const captureError = (error, context = {}, level = 'error') => {
  Sentry.withScope((scope) => {
    // Set error level
    scope.setLevel(level);
    
    // Add context information
    Object.keys(context).forEach(key => {
      scope.setContext(key, context[key]);
    });
    
    // Add user information if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          scope.setUser(JSON.parse(userInfo));
        } catch (e) {
          // Ignore parsing errors
        }
      }
    }
    
    // Capture the exception
    Sentry.captureException(error);
  });
};

/**
 * Capture a custom message
 * @param {string} message - The message to capture
 * @param {string} level - Message level (error, warning, info, debug)
 * @param {Object} context - Additional context information
 */
export const captureMessage = (message, level = 'info', context = {}) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    
    // Add context information
    Object.keys(context).forEach(key => {
      scope.setContext(key, context[key]);
    });
    
    Sentry.captureMessage(message);
  });
};

/**
 * Capture user interactions and events
 * @param {string} action - The action performed
 * @param {Object} data - Additional data about the action
 * @param {string} category - Category of the event
 */
export const captureUserEvent = (action, data = {}, category = 'user-interaction') => {
  Sentry.addBreadcrumb({
    message: action,
    category: category,
    level: 'info',
    data: data,
    timestamp: Date.now() / 1000,
  });
  
  // Also capture as a message for important events
  if (data.important) {
    captureMessage(`User Action: ${action}`, 'info', {
      userAction: {
        action,
        category,
        data,
      },
    });
  }
};

/**
 * Capture API errors
 * @param {string} endpoint - The API endpoint
 * @param {number} status - HTTP status code
 * @param {Object} response - Response data
 * @param {Object} request - Request data
 */
export const captureApiError = (endpoint, status, response = {}, request = {}) => {
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'api');
    scope.setContext('api', {
      endpoint,
      status,
      response: typeof response === 'string' ? response : JSON.stringify(response),
      request: typeof request === 'string' ? request : JSON.stringify(request),
    });
    
    const error = new Error(`API Error: ${endpoint} returned ${status}`);
    error.name = 'ApiError';
    error.status = status;
    
    Sentry.captureException(error);
  });
};

/**
 * Capture performance metrics
 * @param {string} metric - The metric name
 * @param {number} value - The metric value
 * @param {string} unit - The unit of measurement
 */
export const capturePerformance = (metric, value, unit = 'ms') => {
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
  });
};

/**
 * Set user context for Sentry
 * @param {Object} user - User information
 */
export const setUserContext = (user) => {
  Sentry.setUser(user);
  
  // Store in localStorage for persistence
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }
};

/**
 * Clear user context
 */
export const clearUserContext = () => {
  Sentry.setUser(null);
  
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('userInfo');
  }
};

/**
 * Add custom tags to Sentry context
 * @param {Object} tags - Key-value pairs of tags
 */
export const setTags = (tags) => {
  Object.keys(tags).forEach(key => {
    Sentry.setTag(key, tags[key]);
  });
};

/**
 * Add custom context to Sentry
 * @param {string} key - Context key
 * @param {Object} context - Context data
 */
export const setContext = (key, context) => {
  Sentry.setContext(key, context);
};

/**
 * Capture form validation errors
 * @param {string} formName - Name of the form
 * @param {Object} errors - Validation errors
 * @param {Object} formData - Form data (sanitized)
 */
export const captureFormError = (formName, errors, formData = {}) => {
  Sentry.withScope((scope) => {
    scope.setTag('errorType', 'form-validation');
    scope.setContext('form', {
      name: formName,
      errors: typeof errors === 'string' ? errors : JSON.stringify(errors),
      data: typeof formData === 'string' ? formData : JSON.stringify(formData),
    });
    
    const error = new Error(`Form validation failed: ${formName}`);
    error.name = 'FormValidationError';
    
    Sentry.captureException(error);
  });
};

/**
 * Capture navigation events
 * @param {string} from - Previous route
 * @param {string} to - Current route
 * @param {Object} metadata - Additional metadata
 */
export const captureNavigation = (from, to, metadata = {}) => {
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
  });
};

// Export Sentry instance for direct access if needed
export { Sentry };
