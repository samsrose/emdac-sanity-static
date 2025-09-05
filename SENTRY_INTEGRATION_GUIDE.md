# Sentry Integration Guide

This guide explains how to use the Sentry wrapper component and utility functions in your EMDAC Sanity Static site.

## Quick Start

### 1. Wrap Your App with SentryWrapper

In your `pages/_app.js`, wrap your app with the SentryWrapper component:

```javascript
import SentryWrapper from '../components/SentryWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <SentryWrapper>
      <Component {...pageProps} />
    </SentryWrapper>
  );
}

export default MyApp;
```

### 2. Use the Sentry Hook in Components

```javascript
import { useSentry } from '../hooks/useSentry';

function MyComponent() {
  const sentry = useSentry();

  const handleError = () => {
    try {
      // Some code that might throw
      throw new Error('Something went wrong');
    } catch (error) {
      sentry.captureError(error, { component: 'MyComponent' });
    }
  };

  return <button onClick={handleError}>Trigger Error</button>;
}
```

## Available Functions

### Error Handling
- `captureError(error, context, level)` - Capture exceptions with context
- `captureMessage(message, level, context)` - Capture custom messages

### User Interactions
- `captureUserEvent(action, data, category)` - Track user actions
- `setUser(user)` - Set user context
- `clearUser()` - Clear user context

### API & Performance
- `captureApiError(endpoint, status, response, request)` - Track API errors
- `capturePerformance(metric, value, unit)` - Track performance metrics

### Forms
- `captureFormError(formName, errors, formData)` - Track form validation errors

## Specialized Hooks

### useSentryPerformance
Track component performance:

```javascript
import { useSentryPerformance } from '../hooks/useSentry';

function MyComponent() {
  const { trackAction } = useSentryPerformance('MyComponent');

  const handleClick = () => {
    trackAction('button-click', { buttonId: 'submit' });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### useSentryForm
Track form interactions:

```javascript
import { useSentryForm } from '../hooks/useSentry';

function MyForm() {
  const { captureFormValidationError, trackFormSubmission } = useSentryForm('contactForm');

  const handleSubmit = (formData) => {
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      captureFormValidationError(errors, formData);
      trackFormSubmission(false, { errors });
      return;
    }
    
    trackFormSubmission(true, { fields: Object.keys(formData) });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Security Features

- **Data Sanitization**: Sensitive fields (passwords, SSN, etc.) are automatically redacted
- **Environment-based Configuration**: Different settings for development vs production
- **Error Filtering**: Common browser errors are filtered out in production
- **Secure Context**: User information is stored securely with proper cleanup

## Testing

Use the `SentryExample` component to test all Sentry features:

```javascript
import SentryExample from '../components/SentryExample';

// Add to any page for testing
<SentryExample />
```

## Environment Variables

Make sure your `.env.local` includes:

```bash
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

## Best Practices

1. **Wrap at Root Level**: Always wrap your app with `SentryWrapper` at the highest level
2. **Use Context**: Provide meaningful context when capturing errors
3. **Sanitize Data**: Never send sensitive information to Sentry
4. **Track User Actions**: Use `captureUserEvent` for important user interactions
5. **Monitor Performance**: Track slow operations with `capturePerformance`

## Troubleshooting

- Check browser console for Sentry initialization messages
- Verify `NEXT_PUBLIC_SENTRY_DSN` is set correctly
- Ensure SentryWrapper is properly wrapping your app
- Check Sentry dashboard for received events

For more examples, see the `SentryExample` component and the comprehensive utility functions in `lib/sentry.js`.
